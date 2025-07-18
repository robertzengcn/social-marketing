import { Page } from 'puppeteer';
import { CodeBlock } from '@/entityTypes/ArticleScraper';
import * as crypto from 'crypto';

export interface CodeBlockDetectionOptions {
  includeInlineCode: boolean;
  includeComments: boolean;
  preserveFormatting: boolean;
  detectLanguage: boolean;
  minCodeLength: number;
}

export class CodeBlockExtractor {
  private readonly defaultOptions: CodeBlockDetectionOptions = {
    includeInlineCode: false,
    includeComments: true,
    preserveFormatting: true,
    detectLanguage: true,
    minCodeLength: 10
  };

  private readonly codeBlockSelectors = [
    'pre code',
    'pre',
    '.code-block',
    '.highlight',
    '.syntax-highlight',
    '.code',
    '[class*="code"]',
    '[class*="highlight"]',
    'code'
  ];

  private readonly languagePatterns = {
    javascript: /\.(js|jsx|ts|tsx)$|javascript|jsx|typescript/i,
    python: /\.(py|pyw)$|python/i,
    java: /\.(java|class)$|java/i,
    cpp: /\.(cpp|cc|cxx|h|hpp)$|cpp|c\+\+|c plus plus/i,
    csharp: /\.(cs)$|c#|csharp/i,
    php: /\.(php|phtml)$|php/i,
    ruby: /\.(rb|erb)$|ruby/i,
    go: /\.(go)$|golang|go/i,
    rust: /\.(rs)$|rust/i,
    swift: /\.(swift)$|swift/i,
    kotlin: /\.(kt|kts)$|kotlin/i,
    scala: /\.(scala)$|scala/i,
    html: /\.(html|htm)$|html/i,
    css: /\.(css|scss|sass|less)$|css|scss|sass|less/i,
    sql: /\.(sql)$|sql/i,
    bash: /\.(sh|bash|zsh)$|bash|shell|sh/i,
    json: /\.(json)$|json/i,
    xml: /\.(xml|xsd|xslt)$|xml/i,
    yaml: /\.(yml|yaml)$|yaml|yml/i,
    markdown: /\.(md|markdown)$|markdown|md/i
  };

  async extractCodeBlocks(page: Page, options?: Partial<CodeBlockDetectionOptions>): Promise<CodeBlock[]> {
    const config = { ...this.defaultOptions, ...options };
    const codeBlocks: CodeBlock[] = [];

    try {
      // Extract from explicit code block elements
      const explicitBlocks = await this.extractExplicitCodeBlocks(page, config);
      codeBlocks.push(...explicitBlocks);

      // Extract from content that might contain code patterns
      const patternBlocks = await this.extractPatternBasedCodeBlocks(page, config);
      codeBlocks.push(...patternBlocks);

      // Remove duplicates and sort by position
      return this.deduplicateAndSort(codeBlocks);
    } catch (error) {
      console.error('Error extracting code blocks:', error);
      return [];
    }
  }

  private async extractExplicitCodeBlocks(page: Page, config: CodeBlockDetectionOptions): Promise<CodeBlock[]> {
    const blocks: CodeBlock[] = [];

    for (const selector of this.codeBlockSelectors) {
      try {
        const elements = await page.$$(selector);
        
        for (let i = 0; i < elements.length; i++) {
          const element = elements[i];
          const code = await page.evaluate(el => el.textContent || '', element);
          
          if (code.length >= config.minCodeLength) {
            const language = config.detectLanguage ? 
              await this.detectLanguageFromElement(element, code) : 'text';
            
            blocks.push({
              language,
              code: config.preserveFormatting ? code : code.trim(),
              position: i,
              id: this.generateCodeBlockId(code),
              version: 1
            });
          }
        }
      } catch (error) {
        // Continue with next selector if one fails
        console.warn(`Failed to extract from selector ${selector}:`, error);
      }
    }

    return blocks;
  }

  private async extractPatternBasedCodeBlocks(page: Page, config: CodeBlockDetectionOptions): Promise<CodeBlock[]> {
    const blocks: CodeBlock[] = [];

    try {
      // Look for code patterns in the entire page content
      const pageContent = await page.evaluate(() => document.body.innerHTML);
      const codePatterns = this.findCodePatterns(pageContent, config);
      
      codePatterns.forEach((pattern, index) => {
        if (pattern.code.length >= config.minCodeLength) {
          blocks.push({
            language: pattern.language,
            code: config.preserveFormatting ? pattern.code : pattern.code.trim(),
            position: index,
            id: this.generateCodeBlockId(pattern.code),
            version: 1
          });
        }
      });
    } catch (error) {
      console.error('Error extracting pattern-based code blocks:', error);
    }

    return blocks;
  }

  private findCodePatterns(content: string, config: CodeBlockDetectionOptions): Array<{code: string, language: string}> {
    const patterns: Array<{code: string, language: string}> = [];
    
    // Common code patterns
    const codePatterns = [
      // Function definitions
      /function\s+\w+\s*\([^)]*\)\s*\{[\s\S]*?\}/g,
      // Class definitions
      /class\s+\w+[\s\S]*?\{[\s\S]*?\}/g,
      // Import statements
      /import\s+.*?;?\s*$/gm,
      // Variable declarations
      /(?:const|let|var)\s+\w+\s*=\s*[^;]+;?\s*$/gm,
      // SQL queries
      /SELECT\s+.*?FROM\s+.*?(?:WHERE|GROUP BY|ORDER BY|LIMIT)?.*?;?\s*$/gim,
      // HTML tags with content
      /<[^>]+>[\s\S]*?<\/[^>]+>/g,
      // JSON objects
      /\{[^{}]*"[^"]*"\s*:\s*[^,}]+(?:,[^{}]*"[^"]*"\s*:\s*[^,}]+)*\}/g,
      // Array definitions
      /\[\s*[^\[\]]*(?:,\s*[^\[\]]*)*\s*\]/g
    ];

    codePatterns.forEach(pattern => {
      const matches = content.match(pattern);
      if (matches) {
        matches.forEach(match => {
          const language = this.detectLanguageFromContent(match);
          patterns.push({ code: match, language });
        });
      }
    });

    return patterns;
  }

  private async detectLanguageFromElement(element: any, code: string): Promise<string> {
    try {
      // Try to detect from class names
      const className = await element.evaluate(el => el.className);
      if (className) {
        for (const [lang, pattern] of Object.entries(this.languagePatterns)) {
          if (pattern.test(className)) {
            return lang;
          }
        }
      }

      // Try to detect from data attributes
      const dataLang = await element.evaluate(el => el.getAttribute('data-lang') || el.getAttribute('data-language'));
      if (dataLang) {
        return dataLang.toLowerCase();
      }

      // Fallback to content-based detection
      return this.detectLanguageFromContent(code);
    } catch (error) {
      return this.detectLanguageFromContent(code);
    }
  }

  private detectLanguageFromContent(code: string): string {
    // Remove comments and whitespace for better detection
    const cleanCode = code.replace(/\/\*[\s\S]*?\*\/|\/\/.*$/gm, '').trim();
    
    for (const [lang, pattern] of Object.entries(this.languagePatterns)) {
      if (pattern.test(cleanCode)) {
        return lang;
      }
    }

    // Heuristic detection based on code patterns
    if (cleanCode.includes('function') && (cleanCode.includes('{') || cleanCode.includes('=>'))) {
      return 'javascript';
    }
    if (cleanCode.includes('def ') || cleanCode.includes('import ') || cleanCode.includes('print(')) {
      return 'python';
    }
    if (cleanCode.includes('public class') || cleanCode.includes('private ') || cleanCode.includes('System.out')) {
      return 'java';
    }
    if (cleanCode.includes('#include') || cleanCode.includes('std::') || cleanCode.includes('cout')) {
      return 'cpp';
    }
    if (cleanCode.includes('<?php') || cleanCode.includes('echo ') || cleanCode.includes('$')) {
      return 'php';
    }
    if (cleanCode.includes('<html') || cleanCode.includes('<div') || cleanCode.includes('</')) {
      return 'html';
    }
    if (cleanCode.includes('{') && cleanCode.includes(':') && cleanCode.includes(';')) {
      return 'css';
    }
    if (cleanCode.includes('SELECT') || cleanCode.includes('INSERT') || cleanCode.includes('UPDATE')) {
      return 'sql';
    }

    return 'text';
  }

  private generateCodeBlockId(code: string): string {
    const hash = crypto.createHash('md5').update(code).digest('hex');
    return `code_${hash.substring(0, 8)}`;
  }

  private deduplicateAndSort(blocks: CodeBlock[]): CodeBlock[] {
    const seen = new Set<string>();
    const uniqueBlocks: CodeBlock[] = [];

    blocks.forEach(block => {
      const key = `${block.language}_${block.code.substring(0, 100)}`;
      if (!seen.has(key)) {
        seen.add(key);
        uniqueBlocks.push(block);
      }
    });

    return uniqueBlocks.sort((a, b) => a.position - b.position);
  }

  // Utility method to extract inline code
  extractInlineCode(content: string): string[] {
    const inlineCodePattern = /`([^`]+)`/g;
    const matches: string[] = [];
    let match;

    while ((match = inlineCodePattern.exec(content)) !== null) {
      matches.push(match[1]);
    }

    return matches;
  }

  // Utility method to clean and format code
  cleanCode(code: string, language: string): string {
    let cleaned = code.trim();

    // Remove common HTML entities
    cleaned = cleaned
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'");

    // Language-specific cleaning
    switch (language) {
      case 'html':
        // Remove script and style tags from HTML
        cleaned = cleaned.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
        cleaned = cleaned.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');
        break;
      case 'javascript':
      case 'typescript':
        // Remove console.log statements if needed
        // cleaned = cleaned.replace(/console\.log\([^)]*\);?\s*/g, '');
        break;
    }

    return cleaned;
  }
} 