import { getRepository } from 'typeorm';
import { TranslationMemory as TranslationMemoryEntity } from '../entity/TranslationMemory';

/**
 * Interface for translation memory entry
 */
export interface TranslationMemoryEntry {
  sourceText: string;
  translatedText: string;
  sourceLanguage: string;
  targetLanguage: string;
  qualityScore: number;
  usageCount: number;
  lastUsedAt: Date;
  toolUsed: string;
}

/**
 * Interface for translation memory configuration
 */
export interface TranslationMemoryConfig {
  enabled: boolean;
  minQualityScore: number; // Minimum score to save in memory
  maxMemorySize: number; // Maximum number of entries
  autoCleanup: boolean;
  cleanupThreshold: number; // Remove entries older than X days
  toolSpecificMemory: boolean; // Separate memory per translation tool
}

/**
 * Class for managing translation memory (caching translations for consistency and reuse)
 */
export class TranslationMemory {
  private config: TranslationMemoryConfig;

  constructor(config: TranslationMemoryConfig) {
    this.config = config;
  }

  /**
   * Retrieves a translation from memory if available
   * @param sourceText Source text to translate
   * @param sourceLanguage Source language
   * @param targetLanguage Target language
   * @param toolUsed Translation tool used (optional if toolSpecificMemory is false)
   * @returns Cached translation or null if not found
   */
  async getTranslation(
    sourceText: string,
    sourceLanguage: string,
    targetLanguage: string,
    toolUsed?: string
  ): Promise<string | null> {
    if (!this.config.enabled) {
      return null;
    }

    try {
      const repository = getRepository(TranslationMemoryEntity);
      
      const whereCondition: any = {
        sourceText,
        sourceLanguage,
        targetLanguage
      };

      // If tool-specific memory is enabled, include tool in search
      if (this.config.toolSpecificMemory && toolUsed) {
        whereCondition.toolUsed = toolUsed;
      }

      const memoryEntry = await repository.findOne({
        where: whereCondition,
        order: { qualityScore: 'DESC', usageCount: 'DESC' }
      });

      if (memoryEntry) {
        // Update usage count and last used timestamp
        await this.updateUsage(memoryEntry.id);
        return memoryEntry.translatedText;
      }

      return null;
    } catch (error) {
      console.error('Error retrieving translation from memory:', error);
      return null;
    }
  }

  /**
   * Saves a translation to memory
   * @param sourceText Source text
   * @param translatedText Translated text
   * @param sourceLanguage Source language
   * @param targetLanguage Target language
   * @param qualityScore Quality score of the translation
   * @param toolUsed Translation tool used
   * @returns Success status
   */
  async saveTranslation(
    sourceText: string,
    translatedText: string,
    sourceLanguage: string,
    targetLanguage: string,
    qualityScore: number,
    toolUsed: string
  ): Promise<boolean> {
    if (!this.config.enabled || qualityScore < this.config.minQualityScore) {
      return false;
    }

    try {
      const repository = getRepository(TranslationMemoryEntity);

      // Check if entry already exists
      const existingEntry = await repository.findOne({
        where: {
          sourceText,
          sourceLanguage,
          targetLanguage,
          toolUsed: this.config.toolSpecificMemory ? toolUsed : undefined
        }
      });

      if (existingEntry) {
        // Update existing entry if new translation has better quality
        if (qualityScore > existingEntry.qualityScore) {
          existingEntry.translatedText = translatedText;
          existingEntry.qualityScore = qualityScore;
          existingEntry.lastUsedAt = new Date();
          await repository.save(existingEntry);
        }
      } else {
        // Create new entry
        const newEntry = repository.create({
          sourceText,
          translatedText,
          sourceLanguage,
          targetLanguage,
          qualityScore,
          usageCount: 1,
          lastUsedAt: new Date(),
          toolUsed: this.config.toolSpecificMemory ? toolUsed : 'generic'
        });

        await repository.save(newEntry);

        // Check if we need to cleanup old entries
        if (this.config.autoCleanup) {
          await this.cleanupOldEntries();
        }
      }

      return true;
    } catch (error) {
      console.error('Error saving translation to memory:', error);
      return false;
    }
  }

  /**
   * Updates usage statistics for a memory entry
   * @param entryId Memory entry ID
   */
  private async updateUsage(entryId: number): Promise<void> {
    try {
      const repository = getRepository(TranslationMemoryEntity);
      await repository.increment({ id: entryId }, 'usageCount', 1);
      await repository.update(entryId, { lastUsedAt: new Date() });
    } catch (error) {
      console.error('Error updating memory entry usage:', error);
    }
  }

  /**
   * Cleans up old entries based on configuration
   */
  async cleanupOldEntries(): Promise<void> {
    if (!this.config.autoCleanup) {
      return;
    }

    try {
      const repository = getRepository(TranslationMemoryEntity);
      
      // Remove entries older than cleanup threshold
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - this.config.cleanupThreshold);

      await repository.delete({
        lastUsedAt: { $lt: cutoffDate } as any
      });

      // If we still have too many entries, remove lowest quality ones
      const totalEntries = await repository.count();
      if (totalEntries > this.config.maxMemorySize) {
        const entriesToRemove = totalEntries - this.config.maxMemorySize;
        
        const lowQualityEntries = await repository.find({
          order: { qualityScore: 'ASC', usageCount: 'ASC' },
          take: entriesToRemove
        });

        for (const entry of lowQualityEntries) {
          await repository.remove(entry);
        }
      }
    } catch (error) {
      console.error('Error cleaning up translation memory:', error);
    }
  }

  /**
   * Searches for similar translations in memory
   * @param sourceText Source text to find similar translations for
   * @param sourceLanguage Source language
   * @param targetLanguage Target language
   * @param similarityThreshold Minimum similarity threshold (0-1)
   * @param toolUsed Translation tool used (optional)
   * @returns Array of similar translations
   */
  async findSimilarTranslations(
    sourceText: string,
    sourceLanguage: string,
    targetLanguage: string,
    similarityThreshold: number = 0.8,
    toolUsed?: string
  ): Promise<TranslationMemoryEntry[]> {
    if (!this.config.enabled) {
      return [];
    }

    try {
      const repository = getRepository(TranslationMemoryEntity);
      
      const whereCondition: any = {
        sourceLanguage,
        targetLanguage
      };

      if (this.config.toolSpecificMemory && toolUsed) {
        whereCondition.toolUsed = toolUsed;
      }

      const allEntries = await repository.find({
        where: whereCondition,
        order: { qualityScore: 'DESC', usageCount: 'DESC' }
      });

      // Calculate similarity for each entry
      const similarEntries: Array<TranslationMemoryEntry & { similarity: number }> = [];
      
      for (const entry of allEntries) {
        const similarity = this.calculateSimilarity(sourceText, entry.sourceText);
        if (similarity >= similarityThreshold) {
          similarEntries.push({
            ...entry,
            similarity
          });
        }
      }

      // Sort by similarity and return top matches
      return similarEntries
        .sort((a, b) => b.similarity - a.similarity)
        .slice(0, 10)
        .map(({ similarity, ...entry }) => entry);
    } catch (error) {
      console.error('Error finding similar translations:', error);
      return [];
    }
  }

  /**
   * Calculates similarity between two texts using basic algorithms
   * @param text1 First text
   * @param text2 Second text
   * @returns Similarity score (0-1)
   */
  private calculateSimilarity(text1: string, text2: string): number {
    // Simple Jaccard similarity using word sets
    const words1 = new Set(text1.toLowerCase().split(/\s+/));
    const words2 = new Set(text2.toLowerCase().split(/\s+/));

    const intersection = new Set([...words1].filter(word => words2.has(word)));
    const union = new Set([...words1, ...words2]);

    return union.size > 0 ? intersection.size / union.size : 0;
  }

  /**
   * Gets memory statistics
   * @returns Memory statistics
   */
  async getMemoryStatistics(): Promise<{
    totalEntries: number;
    averageQualityScore: number;
    totalUsageCount: number;
    oldestEntry: Date | null;
    newestEntry: Date | null;
  }> {
    try {
      const repository = getRepository(TranslationMemoryEntity);
      
      const totalEntries = await repository.count();
      
      if (totalEntries === 0) {
        return {
          totalEntries: 0,
          averageQualityScore: 0,
          totalUsageCount: 0,
          oldestEntry: null,
          newestEntry: null
        };
      }

      const stats = await repository
        .createQueryBuilder('memory')
        .select([
          'AVG(memory.qualityScore) as avgQuality',
          'SUM(memory.usageCount) as totalUsage',
          'MIN(memory.lastUsedAt) as oldestEntry',
          'MAX(memory.lastUsedAt) as newestEntry'
        ])
        .getRawOne();

      return {
        totalEntries,
        averageQualityScore: parseFloat(stats.avgQuality) || 0,
        totalUsageCount: parseInt(stats.totalUsage) || 0,
        oldestEntry: stats.oldestEntry ? new Date(stats.oldestEntry) : null,
        newestEntry: stats.newestEntry ? new Date(stats.newestEntry) : null
      };
    } catch (error) {
      console.error('Error getting memory statistics:', error);
      return {
        totalEntries: 0,
        averageQualityScore: 0,
        totalUsageCount: 0,
        oldestEntry: null,
        newestEntry: null
      };
    }
  }

  /**
   * Clears all translation memory entries
   * @returns Success status
   */
  async clearMemory(): Promise<boolean> {
    try {
      const repository = getRepository(TranslationMemoryEntity);
      await repository.clear();
      return true;
    } catch (error) {
      console.error('Error clearing translation memory:', error);
      return false;
    }
  }

  /**
   * Exports translation memory to JSON
   * @returns Memory entries as JSON
   */
  async exportMemory(): Promise<TranslationMemoryEntry[]> {
    try {
      const repository = getRepository(TranslationMemoryEntity);
      const entries = await repository.find({
        order: { lastUsedAt: 'DESC' }
      });

      return entries.map(entry => ({
        sourceText: entry.sourceText,
        translatedText: entry.translatedText,
        sourceLanguage: entry.sourceLanguage,
        targetLanguage: entry.targetLanguage,
        qualityScore: entry.qualityScore,
        usageCount: entry.usageCount,
        lastUsedAt: entry.lastUsedAt,
        toolUsed: entry.toolUsed
      }));
    } catch (error) {
      console.error('Error exporting translation memory:', error);
      return [];
    }
  }

  /**
   * Imports translation memory from JSON
   * @param entries Memory entries to import
   * @returns Success status
   */
  async importMemory(entries: TranslationMemoryEntry[]): Promise<boolean> {
    try {
      const repository = getRepository(TranslationMemoryEntity);
      
      for (const entry of entries) {
        const newEntry = repository.create({
          sourceText: entry.sourceText,
          translatedText: entry.translatedText,
          sourceLanguage: entry.sourceLanguage,
          targetLanguage: entry.targetLanguage,
          qualityScore: entry.qualityScore,
          usageCount: entry.usageCount,
          lastUsedAt: entry.lastUsedAt,
          toolUsed: entry.toolUsed
        });

        await repository.save(newEntry);
      }

      return true;
    } catch (error) {
      console.error('Error importing translation memory:', error);
      return false;
    }
  }

  /**
   * Updates the translation memory configuration
   * @param newConfig New configuration
   */
  updateConfig(newConfig: Partial<TranslationMemoryConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }

  /**
   * Gets the current configuration
   * @returns Current configuration
   */
  getConfig(): TranslationMemoryConfig {
    return { ...this.config };
  }
} 