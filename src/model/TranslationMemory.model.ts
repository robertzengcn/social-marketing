import { BaseDb } from "@/model/Basedb";
import { Repository } from "typeorm";
import { TranslationMemoryEntity } from "@/entity/TranslationMemory.entity";
import { getRecorddatetime } from "@/modules/lib/function";

export class TranslationMemoryModel extends BaseDb {
  private repository: Repository<TranslationMemoryEntity>;

  constructor(filepath: string) {
    super(filepath);
    this.repository = this.sqliteDb.connection.getRepository(TranslationMemoryEntity);
  }

  /**
   * Save or update translation memory entry
   */
  async saveTranslationMemory(
    sourceText: string,
    translatedText: string,
    sourceLanguage: string,
    targetLanguage: string,
    qualityScore?: number,
    toolUsed?: string
  ): Promise<number> {
    const uniqueKey = this.generateUniqueKey(sourceText, sourceLanguage, targetLanguage);
    
    const existingEntry = await this.getTranslationMemoryByKey(uniqueKey);
    
    if (existingEntry) {
      // Update existing entry
      existingEntry.translatedText = translatedText;
      existingEntry.qualityScore = qualityScore || existingEntry.qualityScore;
      existingEntry.usageCount = (existingEntry.usageCount || 1) + 1;
      existingEntry.lastUsedAt = new Date();
      existingEntry.toolUsed = toolUsed || existingEntry.toolUsed;
      
      const savedEntry = await this.repository.save(existingEntry);
      return savedEntry.id;
    } else {
      // Create new entry
      const newEntry = this.repository.create({
        sourceText,
        translatedText,
        sourceLanguage,
        targetLanguage,
        qualityScore: qualityScore || 0.8,
        usageCount: 1,
        createdAt: new Date(),
        lastUsedAt: new Date(),
        toolUsed: toolUsed || 'unknown',
        uniqueKey
      });
      
      const savedEntry = await this.repository.save(newEntry);
      return savedEntry.id;
    }
  }

  /**
   * Get translation memory by unique key
   */
  async getTranslationMemoryByKey(uniqueKey: string): Promise<TranslationMemoryEntity | null> {
    return this.repository.findOne({ where: { uniqueKey } });
  }

  /**
   * Get translation memory by source text and language pair
   */
  async getTranslationMemory(
    sourceText: string,
    sourceLanguage: string,
    targetLanguage: string
  ): Promise<TranslationMemoryEntity | null> {
    const uniqueKey = this.generateUniqueKey(sourceText, sourceLanguage, targetLanguage);
    return this.getTranslationMemoryByKey(uniqueKey);
  }

  /**
   * Search translation memory by partial text match
   */
  async searchTranslationMemory(
    searchText: string,
    sourceLanguage: string,
    targetLanguage: string,
    limit: number = 10
  ): Promise<TranslationMemoryEntity[]> {
    return this.repository
      .createQueryBuilder('memory')
      .where('memory.sourceText LIKE :searchText', { searchText: `%${searchText}%` })
      .andWhere('memory.sourceLanguage = :sourceLanguage', { sourceLanguage })
      .andWhere('memory.targetLanguage = :targetLanguage', { targetLanguage })
      .orderBy('memory.usageCount', 'DESC')
      .addOrderBy('memory.qualityScore', 'DESC')
      .take(limit)
      .getMany();
  }

  /**
   * Get translation memory by language pair
   */
  async getTranslationMemoryByLanguagePair(
    sourceLanguage: string,
    targetLanguage: string,
    limit: number = 50,
    offset: number = 0
  ): Promise<TranslationMemoryEntity[]> {
    return this.repository.find({
      where: { sourceLanguage, targetLanguage },
      order: { usageCount: 'DESC', qualityScore: 'DESC' },
      take: limit,
      skip: offset
    });
  }

  /**
   * Update usage count for a translation memory entry
   */
  async updateUsageCount(id: number): Promise<boolean> {
    const result = await this.repository.update(id, {
      usageCount: () => 'usageCount + 1',
      lastUsedAt: new Date()
    });
    return result.affected ? result.affected > 0 : false;
  }

  /**
   * Update quality score for a translation memory entry
   */
  async updateQualityScore(id: number, qualityScore: number): Promise<boolean> {
    const result = await this.repository.update(id, { qualityScore });
    return result.affected ? result.affected > 0 : false;
  }

  /**
   * Delete translation memory entry by ID
   */
  async deleteTranslationMemory(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected ? result.affected > 0 : false;
  }

  /**
   * Clean up old translation memory entries
   */
  async cleanupOldEntries(daysOld: number = 30): Promise<number> {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysOld);
    
    const result = await this.repository
      .createQueryBuilder('memory')
      .delete()
      .where('memory.lastUsedAt < :cutoffDate', { cutoffDate })
      .andWhere('memory.usageCount < 2') // Only delete entries used less than 2 times
      .execute();
    
    return result.affected || 0;
  }

  /**
   * Get translation memory statistics
   */
  async getTranslationMemoryStatistics(): Promise<{
    total: number;
    byLanguagePair: Record<string, number>;
    averageQualityScore: number;
    totalUsageCount: number;
  }> {
    const total = await this.repository.count();
    
    // Get counts by language pair
    const languagePairCounts = await this.repository
      .createQueryBuilder('memory')
      .select('memory.sourceLanguage', 'sourceLanguage')
      .addSelect('memory.targetLanguage', 'targetLanguage')
      .addSelect('COUNT(*)', 'count')
      .groupBy('memory.sourceLanguage, memory.targetLanguage')
      .getRawMany();
    
    const byLanguagePair: Record<string, number> = {};
    languagePairCounts.forEach(item => {
      const key = `${item.sourceLanguage}-${item.targetLanguage}`;
      byLanguagePair[key] = parseInt(item.count);
    });
    
    // Get average quality score
    const avgQualityResult = await this.repository
      .createQueryBuilder('memory')
      .select('AVG(memory.qualityScore)', 'averageQualityScore')
      .getRawOne();
    
    const averageQualityScore = avgQualityResult?.averageQualityScore || 0;
    
    // Get total usage count
    const totalUsageResult = await this.repository
      .createQueryBuilder('memory')
      .select('SUM(memory.usageCount)', 'totalUsageCount')
      .getRawOne();
    
    const totalUsageCount = totalUsageResult?.totalUsageCount || 0;
    
    return {
      total,
      byLanguagePair,
      averageQualityScore,
      totalUsageCount
    };
  }

  /**
   * Get most frequently used translations
   */
  async getMostUsedTranslations(limit: number = 20): Promise<TranslationMemoryEntity[]> {
    return this.repository.find({
      order: { usageCount: 'DESC' },
      take: limit
    });
  }

  /**
   * Get highest quality translations
   */
  async getHighestQualityTranslations(limit: number = 20): Promise<TranslationMemoryEntity[]> {
    return this.repository.find({
      order: { qualityScore: 'DESC' },
      take: limit
    });
  }

  /**
   * Generate unique key for translation memory
   */
  private generateUniqueKey(sourceText: string, sourceLanguage: string, targetLanguage: string): string {
    return `${sourceLanguage}:${targetLanguage}:${this.hashString(sourceText)}`;
  }

  /**
   * Simple hash function for generating unique keys
   */
  private hashString(str: string): string {
    let hash = 0;
    if (str.length === 0) return hash.toString();
    
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    
    return Math.abs(hash).toString();
  }
} 