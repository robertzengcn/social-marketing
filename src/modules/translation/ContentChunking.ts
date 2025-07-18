import { ArticleContent, ArticleChunk, CodeBlock } from '../types/ArticleTypes';

/**
 * Utility class for chunking article content into manageable pieces for translation
 * while preserving code blocks and maintaining content structure
 */
export class ContentChunking {
  private static readonly DEFAULT_CHUNK_SIZE = 2000; // tokens
  private static readonly MAX_CHUNK_SIZE = 4000; // tokens
  private static readonly MIN_CHUNK_SIZE = 500; // tokens

  /**
   * Chunks article content into manageable pieces for translation
   * @param content The article content to chunk
   * @param chunkSize Maximum tokens per chunk
   * @returns Array of content chunks
   */
  static chunkArticle(content: ArticleContent, chunkSize: number = this.DEFAULT_CHUNK_SIZE): ArticleChunk[] {
    const chunks: ArticleChunk[] = [];
    let chunkId = 1;

    // First, extract and preserve code blocks
    const codeBlocks = content.codeBlocks || [];
    const textContent = this.removeCodeBlocksFromText(content.content, codeBlocks);

    // Split text content into paragraphs
    const paragraphs = this.splitIntoParagraphs(textContent);

    let currentChunk = '';
    let currentChunkTokens = 0;
    let codeBlockIndex = 0;

    for (let i = 0; i < paragraphs.length; i++) {
      const paragraph = paragraphs[i];
      const paragraphTokens = this.estimateTokenCount(paragraph);

      // Check if adding this paragraph would exceed chunk size
      if (currentChunkTokens + paragraphTokens > chunkSize && currentChunk.trim()) {
        // Finalize current chunk
        chunks.push({
          id: `chunk_${chunkId++}`,
          content: currentChunk.trim(),
          type: 'text',
          position: chunks.length
        });

        // Start new chunk
        currentChunk = paragraph;
        currentChunkTokens = paragraphTokens;
      } else {
        // Add paragraph to current chunk
        currentChunk += (currentChunk ? '\n\n' : '') + paragraph;
        currentChunkTokens += paragraphTokens;
      }

      // Check if we need to insert code blocks
      while (codeBlockIndex < codeBlocks.length) {
        const codeBlock = codeBlocks[codeBlockIndex];
        const codeBlockTokens = this.estimateTokenCount(codeBlock.code);

        // If code block would fit in current chunk, add it
        if (currentChunkTokens + codeBlockTokens <= chunkSize) {
          currentChunk += `\n\n\`\`\`${codeBlock.language}\n${codeBlock.code}\n\`\`\``;
          currentChunkTokens += codeBlockTokens;
          codeBlockIndex++;
        } else {
          // Code block is too large for current chunk, create separate chunk for it
          if (currentChunk.trim()) {
            chunks.push({
              id: `chunk_${chunkId++}`,
              content: currentChunk.trim(),
              type: 'text',
              position: chunks.length
            });
          }

          // Create separate chunk for code block
          chunks.push({
            id: `chunk_${chunkId++}`,
            content: `\`\`\`${codeBlock.language}\n${codeBlock.code}\n\`\`\``,
            type: 'code',
            position: chunks.length,
            codeBlockId: codeBlock.id
          });

          currentChunk = '';
          currentChunkTokens = 0;
          codeBlockIndex++;
          break;
        }
      }
    }

    // Add remaining content
    if (currentChunk.trim()) {
      chunks.push({
        id: `chunk_${chunkId++}`,
        content: currentChunk.trim(),
        type: 'text',
        position: chunks.length
      });
    }

    // Add any remaining code blocks
    while (codeBlockIndex < codeBlocks.length) {
      const codeBlock = codeBlocks[codeBlockIndex];
      chunks.push({
        id: `chunk_${chunkId++}`,
        content: `\`\`\`${codeBlock.language}\n${codeBlock.code}\n\`\`\``,
        type: 'code',
        position: chunks.length,
        codeBlockId: codeBlock.id
      });
      codeBlockIndex++;
    }

    return chunks;
  }

  /**
   * Splits text content into paragraphs while preserving structure
   * @param text The text content to split
   * @returns Array of paragraphs
   */
  private static splitIntoParagraphs(text: string): string[] {
    // Split by double newlines to preserve paragraph structure
    const paragraphs = text.split(/\n\s*\n/);
    
    // Clean up paragraphs and filter out empty ones
    return paragraphs
      .map(p => p.trim())
      .filter(p => p.length > 0);
  }

  /**
   * Removes code blocks from text content to prepare for chunking
   * @param content The original content
   * @param codeBlocks Array of code blocks to remove
   * @returns Text content without code blocks
   */
  private static removeCodeBlocksFromText(content: string, codeBlocks: CodeBlock[]): string {
    let textContent = content;

    // Sort code blocks by position in reverse order to avoid index shifting
    const sortedBlocks = [...codeBlocks].sort((a, b) => b.position - a.position);

    for (const block of sortedBlocks) {
      // Find the code block in the text and remove it
      const codePattern = new RegExp(`\`\`\`${block.language}\\n[\\s\\S]*?\`\`\``, 'g');
      textContent = textContent.replace(codePattern, '');
    }

    return textContent;
  }

  /**
   * Estimates token count for a given text
   * @param text The text to estimate tokens for
   * @returns Estimated token count
   */
  private static estimateTokenCount(text: string): number {
    // Rough estimation: 1 token ≈ 4 characters for English
    // For Chinese: 1 token ≈ 2 characters
    const englishChars = text.replace(/[\u4e00-\u9fff]/g, '').length;
    const chineseChars = text.length - englishChars;
    
    return Math.ceil(englishChars / 4 + chineseChars / 2);
  }

  /**
   * Merges translated chunks back into a complete article
   * @param chunks Array of translated chunks
   * @param originalContent Original article content for reference
   * @returns Merged translated content
   */
  static mergeChunks(chunks: ArticleChunk[], originalContent: ArticleContent): string {
    // Sort chunks by position
    const sortedChunks = [...chunks].sort((a, b) => a.position - b.position);
    
    let mergedContent = '';
    
    for (const chunk of sortedChunks) {
      if (mergedContent) {
        mergedContent += '\n\n';
      }
      mergedContent += chunk.content;
    }

    return mergedContent;
  }

  /**
   * Validates chunk size and adjusts if necessary
   * @param chunkSize Requested chunk size
   * @returns Validated chunk size
   */
  static validateChunkSize(chunkSize: number): number {
    if (chunkSize < this.MIN_CHUNK_SIZE) {
      return this.MIN_CHUNK_SIZE;
    }
    if (chunkSize > this.MAX_CHUNK_SIZE) {
      return this.MAX_CHUNK_SIZE;
    }
    return chunkSize;
  }

  /**
   * Gets chunk statistics for monitoring and optimization
   * @param chunks Array of chunks
   * @returns Statistics about the chunks
   */
  static getChunkStatistics(chunks: ArticleChunk[]): {
    totalChunks: number;
    textChunks: number;
    codeChunks: number;
    averageChunkSize: number;
    largestChunk: number;
    smallestChunk: number;
  } {
    const textChunks = chunks.filter(c => c.type === 'text');
    const codeChunks = chunks.filter(c => c.type === 'code');
    
    const chunkSizes = chunks.map(c => this.estimateTokenCount(c.content));
    const totalSize = chunkSizes.reduce((sum, size) => sum + size, 0);
    
    return {
      totalChunks: chunks.length,
      textChunks: textChunks.length,
      codeChunks: codeChunks.length,
      averageChunkSize: chunks.length > 0 ? Math.round(totalSize / chunks.length) : 0,
      largestChunk: Math.max(...chunkSizes),
      smallestChunk: Math.min(...chunkSizes)
    };
  }
} 