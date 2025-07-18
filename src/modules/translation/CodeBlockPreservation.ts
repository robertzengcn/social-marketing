import { ArticleContent, CodeBlock } from '@/entityTypes/ArticleScraper';
import { ArticleChunk } from '@/entityTypes/ArticleTranslationService';
import { CodeBlockExtractor } from '@/strategy/scraping/CodeBlockExtractor';

export class CodeBlockPreservation {
  private extractor: CodeBlockExtractor;

  constructor() {
    this.extractor = new CodeBlockExtractor();
  }

  /**
   * Extract code blocks from article content and return them with their positions.
   */
  extractCodeBlocksFromContent(content: string): CodeBlock[] {
    // For translation, we can use the extractor with default options
    // (optionally, pass custom options for stricter/looser detection)
    // This is a synchronous wrapper for compatibility
    // In practice, you may want to use the async extractor for Puppeteer Page
    // Here, we use regex for static content
    const codeBlocks: CodeBlock[] = [];
    const codeBlockRegex = /```([\w-]*)\n([\s\S]*?)```/g;
    let match;
    let position = 0;
    while ((match = codeBlockRegex.exec(content)) !== null) {
      codeBlocks.push({
        language: match[1] || 'text',
        code: match[2],
        position: position++,
        id: `codeblock_${position}`,
        version: 1
      });
    }
    return codeBlocks;
  }

  /**
   * Replace code blocks in the content with placeholders for translation.
   */
  replaceCodeBlocksWithPlaceholders(content: string, codeBlocks: CodeBlock[]): { contentWithPlaceholders: string, placeholderMap: Record<string, string> } {
    let contentWithPlaceholders = content;
    const placeholderMap: Record<string, string> = {};
    codeBlocks.forEach((block, idx) => {
      const placeholder = `[[[CODE_BLOCK_${idx}]]]`;
      // Replace the code block with the placeholder
      const codeBlockPattern = new RegExp(
        '```' + (block.language ? block.language : '') + '\\n' + block.code.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '```',
        'g'
      );
      contentWithPlaceholders = contentWithPlaceholders.replace(codeBlockPattern, placeholder);
      placeholderMap[placeholder] = `

 0```$${block.language}\n${block.code}` + '```\n';
    });
    return { contentWithPlaceholders, placeholderMap };
  }

  /**
   * Restore code blocks into the translated content using the placeholder map.
   */
  restoreCodeBlocksFromPlaceholders(translatedContent: string, placeholderMap: Record<string, string>): string {
    let restoredContent = translatedContent;
    Object.entries(placeholderMap).forEach(([placeholder, codeBlock]) => {
      restoredContent = restoredContent.replace(placeholder, codeBlock);
    });
    return restoredContent;
  }

  /**
   * Utility to preserve code blocks during translation: extract, replace, and restore.
   */
  preserveDuringTranslation(content: string): { contentForTranslation: string, codeBlocks: CodeBlock[], placeholderMap: Record<string, string> } {
    const codeBlocks = this.extractCodeBlocksFromContent(content);
    const { contentWithPlaceholders, placeholderMap } = this.replaceCodeBlocksWithPlaceholders(content, codeBlocks);
    return { contentForTranslation: contentWithPlaceholders, codeBlocks, placeholderMap };
  }
} 