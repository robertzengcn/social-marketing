import { LanguageItem } from '../types/LanguageTypes';

/**
 * Interface for translation quality metrics
 */
export interface TranslationQualityMetrics {
  accuracy: number; // 0-1, how accurately the meaning is preserved
  fluency: number; // 0-1, how natural the translation sounds
  completeness: number; // 0-1, how much of the original content is translated
  consistency: number; // 0-1, consistency in terminology and style
  overallScore: number; // 0-1, weighted average of all metrics
}

/**
 * Interface for quality control configuration
 */
export interface QualityControlConfig {
  minQualityScore: number; // Minimum acceptable quality score (0-1)
  autoRetry: boolean; // Whether to automatically retry low-quality translations
  maxRetries: number; // Maximum number of retry attempts
  humanReviewThreshold: number; // Score below which human review is suggested
  retryWithDifferentTool: boolean; // Try different LLM if current fails
  fallbackTools: string[]; // Fallback tools in order of preference
  qualityCheckEnabled: boolean; // Whether to perform quality checks
}

/**
 * Interface for quality check result
 */
export interface QualityCheckResult {
  passed: boolean;
  score: TranslationQualityMetrics;
  issues: string[];
  suggestions: string[];
  requiresHumanReview: boolean;
  recommendedAction: 'accept' | 'retry' | 'human_review' | 'reject';
}

/**
 * Class for translation quality control and validation
 */
export class TranslationQualityControl {
  private config: QualityControlConfig;

  constructor(config: QualityControlConfig) {
    this.config = config;
  }

  /**
   * Performs comprehensive quality check on translated content
   * @param originalText Original source text
   * @param translatedText Translated text
   * @param sourceLanguage Source language
   * @param targetLanguage Target language
   * @param toolUsed Translation tool used
   * @returns Quality check result
   */
  async checkQuality(
    originalText: string,
    translatedText: string,
    sourceLanguage: LanguageItem,
    targetLanguage: LanguageItem,
    toolUsed: string
  ): Promise<QualityCheckResult> {
    if (!this.config.qualityCheckEnabled) {
      return {
        passed: true,
        score: { accuracy: 1, fluency: 1, completeness: 1, consistency: 1, overallScore: 1 },
        issues: [],
        suggestions: [],
        requiresHumanReview: false,
        recommendedAction: 'accept'
      };
    }

    const metrics = await this.calculateQualityMetrics(
      originalText,
      translatedText,
      sourceLanguage,
      targetLanguage
    );

    const issues = this.identifyIssues(originalText, translatedText, metrics);
    const suggestions = this.generateSuggestions(issues, metrics, toolUsed);
    const requiresHumanReview = metrics.overallScore < this.config.humanReviewThreshold;
    const passed = metrics.overallScore >= this.config.minQualityScore;

    let recommendedAction: 'accept' | 'retry' | 'human_review' | 'reject' = 'accept';
    
    if (!passed) {
      if (this.config.autoRetry) {
        recommendedAction = 'retry';
      } else if (requiresHumanReview) {
        recommendedAction = 'human_review';
      } else {
        recommendedAction = 'reject';
      }
    } else if (requiresHumanReview) {
      recommendedAction = 'human_review';
    }

    return {
      passed,
      score: metrics,
      issues,
      suggestions,
      requiresHumanReview,
      recommendedAction
    };
  }

  /**
   * Calculates quality metrics for the translation
   * @param originalText Original source text
   * @param translatedText Translated text
   * @param sourceLanguage Source language
   * @param targetLanguage Target language
   * @returns Quality metrics
   */
  private async calculateQualityMetrics(
    originalText: string,
    translatedText: string,
    sourceLanguage: LanguageItem,
    targetLanguage: LanguageItem
  ): Promise<TranslationQualityMetrics> {
    // Calculate completeness (how much content was translated)
    const completeness = this.calculateCompleteness(originalText, translatedText);

    // Calculate fluency (basic checks for natural language patterns)
    const fluency = this.calculateFluency(translatedText, targetLanguage);

    // Calculate consistency (terminology and style consistency)
    const consistency = this.calculateConsistency(translatedText);

    // Calculate accuracy (basic semantic similarity)
    const accuracy = this.calculateAccuracy(originalText, translatedText);

    // Calculate overall score (weighted average)
    const overallScore = this.calculateOverallScore({
      accuracy,
      fluency,
      completeness,
      consistency
    });

    return {
      accuracy,
      fluency,
      completeness,
      consistency,
      overallScore
    };
  }

  /**
   * Calculates completeness score
   * @param originalText Original text
   * @param translatedText Translated text
   * @returns Completeness score (0-1)
   */
  private calculateCompleteness(originalText: string, translatedText: string): number {
    const originalLength = originalText.trim().length;
    const translatedLength = translatedText.trim().length;

    if (originalLength === 0) return 1;
    if (translatedLength === 0) return 0;

    // Check for significant length differences
    const lengthRatio = translatedLength / originalLength;
    
    // For most language pairs, translated text should be within 0.5-2.0 ratio
    if (lengthRatio < 0.3 || lengthRatio > 3.0) {
      return 0.3; // Likely incomplete or over-translated
    } else if (lengthRatio < 0.5 || lengthRatio > 2.0) {
      return 0.7; // Somewhat concerning
    } else {
      return 0.9; // Good length ratio
    }
  }

  /**
   * Calculates fluency score based on basic language patterns
   * @param translatedText Translated text
   * @param targetLanguage Target language
   * @returns Fluency score (0-1)
   */
  private calculateFluency(translatedText: string, targetLanguage: LanguageItem): number {
    let fluencyScore = 1.0;

    // Check for common translation artifacts
    const issues = [
      // Check for literal translations that don't make sense
      /[A-Za-z]+\s*[A-Za-z]+\s*[A-Za-z]+\s*[A-Za-z]+\s*[A-Za-z]+/g, // Very long English words
      /[^\u4e00-\u9fff\s\w\.,!?;:()[\]{}"'`~@#$%^&*+=|\\/<>-]/g, // Unusual characters
    ];

    for (const pattern of issues) {
      const matches = translatedText.match(pattern);
      if (matches && matches.length > 0) {
        fluencyScore -= 0.1 * Math.min(matches.length, 5); // Cap penalty at 0.5
      }
    }

    // Check for repeated words (potential translation artifacts)
    const words = translatedText.split(/\s+/);
    const wordCounts = new Map<string, number>();
    
    for (const word of words) {
      const cleanWord = word.toLowerCase().replace(/[^\w]/g, '');
      if (cleanWord.length > 2) {
        wordCounts.set(cleanWord, (wordCounts.get(cleanWord) || 0) + 1);
      }
    }

    // Penalize excessive repetition
    for (const [word, count] of wordCounts) {
      if (count > 3) {
        fluencyScore -= 0.05 * (count - 3);
      }
    }

    return Math.max(0, Math.min(1, fluencyScore));
  }

  /**
   * Calculates consistency score
   * @param translatedText Translated text
   * @returns Consistency score (0-1)
   */
  private calculateConsistency(translatedText: string): number {
    let consistencyScore = 1.0;

    // Check for consistent capitalization
    const sentences = translatedText.split(/[.!?]+/);
    let inconsistentCapitalization = 0;
    
    for (const sentence of sentences) {
      const trimmed = sentence.trim();
      if (trimmed.length > 0) {
        const firstChar = trimmed[0];
        if (firstChar !== firstChar.toUpperCase() && firstChar !== firstChar.toLowerCase()) {
          inconsistentCapitalization++;
        }
      }
    }

    if (inconsistentCapitalization > 0) {
      consistencyScore -= 0.1 * Math.min(inconsistentCapitalization, 5);
    }

    // Check for consistent punctuation
    const punctuationIssues = [
      /[.!?]{2,}/g, // Multiple punctuation marks
      /[,\s]{2,}/g, // Multiple spaces or commas
    ];

    for (const pattern of punctuationIssues) {
      const matches = translatedText.match(pattern);
      if (matches && matches.length > 0) {
        consistencyScore -= 0.05 * Math.min(matches.length, 3);
      }
    }

    return Math.max(0, Math.min(1, consistencyScore));
  }

  /**
   * Calculates accuracy score using basic semantic similarity
   * @param originalText Original text
   * @param translatedText Translated text
   * @returns Accuracy score (0-1)
   */
  private calculateAccuracy(originalText: string, translatedText: string): number {
    // Basic accuracy check based on content structure
    let accuracyScore = 1.0;

    // Check if both texts have similar structure (paragraphs, sentences)
    const originalParagraphs = originalText.split(/\n\s*\n/).length;
    const translatedParagraphs = translatedText.split(/\n\s*\n/).length;
    
    if (Math.abs(originalParagraphs - translatedParagraphs) > 2) {
      accuracyScore -= 0.2; // Significant structural difference
    }

    // Check for preserved formatting markers
    const originalMarkers = this.countFormattingMarkers(originalText);
    const translatedMarkers = this.countFormattingMarkers(translatedText);
    
    if (Math.abs(originalMarkers - translatedMarkers) > originalMarkers * 0.5) {
      accuracyScore -= 0.3; // Lost significant formatting
    }

    // Check for code blocks preservation
    const originalCodeBlocks = (originalText.match(/```[\s\S]*?```/g) || []).length;
    const translatedCodeBlocks = (translatedText.match(/```[\s\S]*?```/g) || []).length;
    
    if (originalCodeBlocks !== translatedCodeBlocks) {
      accuracyScore -= 0.4; // Code blocks were lost or added
    }

    return Math.max(0, Math.min(1, accuracyScore));
  }

  /**
   * Counts formatting markers in text
   * @param text Text to analyze
   * @returns Number of formatting markers
   */
  private countFormattingMarkers(text: string): number {
    const markers = [
      /```/g, // Code blocks
      /`[^`]+`/g, // Inline code
      /\*\*[^*]+\*\*/g, // Bold
      /\*[^*]+\*/g, // Italic
      /\[[^\]]+\]\([^)]+\)/g, // Links
      /#{1,6}\s/g, // Headers
    ];

    let count = 0;
    for (const pattern of markers) {
      const matches = text.match(pattern);
      if (matches) {
        count += matches.length;
      }
    }

    return count;
  }

  /**
   * Calculates overall quality score
   * @param metrics Individual quality metrics
   * @returns Overall score (0-1)
   */
  private calculateOverallScore(metrics: Omit<TranslationQualityMetrics, 'overallScore'>): number {
    // Weighted average with accuracy being most important
    const weights = {
      accuracy: 0.4,
      fluency: 0.25,
      completeness: 0.2,
      consistency: 0.15
    };

    return (
      metrics.accuracy * weights.accuracy +
      metrics.fluency * weights.fluency +
      metrics.completeness * weights.completeness +
      metrics.consistency * weights.consistency
    );
  }

  /**
   * Identifies specific issues in the translation
   * @param originalText Original text
   * @param translatedText Translated text
   * @param metrics Quality metrics
   * @returns Array of identified issues
   */
  private identifyIssues(
    originalText: string,
    translatedText: string,
    metrics: TranslationQualityMetrics
  ): string[] {
    const issues: string[] = [];

    if (metrics.accuracy < 0.7) {
      issues.push('Low accuracy: Translation may not preserve original meaning');
    }

    if (metrics.fluency < 0.7) {
      issues.push('Low fluency: Translation may sound unnatural');
    }

    if (metrics.completeness < 0.7) {
      issues.push('Low completeness: Significant content may be missing or over-translated');
    }

    if (metrics.consistency < 0.7) {
      issues.push('Low consistency: Inconsistent terminology or formatting');
    }

    // Check for specific issues
    if (translatedText.length < originalText.length * 0.3) {
      issues.push('Translation appears to be significantly shorter than original');
    }

    if (translatedText.length > originalText.length * 3) {
      issues.push('Translation appears to be significantly longer than original');
    }

    // Check for code block issues
    const originalCodeBlocks = (originalText.match(/```[\s\S]*?```/g) || []).length;
    const translatedCodeBlocks = (translatedText.match(/```[\s\S]*?```/g) || []).length;
    
    if (originalCodeBlocks !== translatedCodeBlocks) {
      issues.push(`Code block count mismatch: Original has ${originalCodeBlocks}, translation has ${translatedCodeBlocks}`);
    }

    return issues;
  }

  /**
   * Generates suggestions for improving translation quality
   * @param issues Identified issues
   * @param metrics Quality metrics
   * @param toolUsed Translation tool used
   * @returns Array of suggestions
   */
  private generateSuggestions(
    issues: string[],
    metrics: TranslationQualityMetrics,
    toolUsed: string
  ): string[] {
    const suggestions: string[] = [];

    if (metrics.accuracy < 0.7) {
      suggestions.push('Consider retrying with a different translation tool');
      suggestions.push('Review and refine the translation prompt');
    }

    if (metrics.fluency < 0.7) {
      suggestions.push('Consider using a more fluent translation model');
      suggestions.push('Review for literal translations that don\'t make sense');
    }

    if (metrics.completeness < 0.7) {
      suggestions.push('Check if all content was properly translated');
      suggestions.push('Verify that no important information was omitted');
    }

    if (metrics.consistency < 0.7) {
      suggestions.push('Review for consistent terminology usage');
      suggestions.push('Check formatting consistency throughout the text');
    }

    if (this.config.retryWithDifferentTool && this.config.fallbackTools.length > 0) {
      const nextTool = this.config.fallbackTools.find(tool => tool !== toolUsed);
      if (nextTool) {
        suggestions.push(`Try retranslating with ${nextTool}`);
      }
    }

    if (metrics.overallScore < this.config.humanReviewThreshold) {
      suggestions.push('Consider human review for this translation');
    }

    return suggestions;
  }

  /**
   * Updates the quality control configuration
   * @param newConfig New configuration
   */
  updateConfig(newConfig: Partial<QualityControlConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }

  /**
   * Gets the current configuration
   * @returns Current configuration
   */
  getConfig(): QualityControlConfig {
    return { ...this.config };
  }
} 