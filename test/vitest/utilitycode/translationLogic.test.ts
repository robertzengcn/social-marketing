import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { TranslateProducer } from '@/modules/TranslateProducer';
import { ArticleTranslationService } from '@/modules/translation/ArticleTranslationService';
import { ArticleTranslationStrategy } from '@/modules/translation/ArticleTranslationStrategy';
import { CodeBlockPreservation } from '@/modules/translation/CodeBlockPreservation';
import { TranslationQualityControl } from '@/modules/translation/TranslationQualityControl';
import { ContentChunking } from '@/modules/translation/ContentChunking';
import { TranslationMemory } from '@/modules/translation/TranslationMemory';
import { LlmFactory } from '@/modules/llm/LlmFactory';
import { TranslateToolEnum } from '@/config/generate';
import { LanguageItem } from '@/entityTypes/commonType';

// Mock the LLM implementations
vi.mock('@/modules/llm/OllamaLlm');
vi.mock('@/modules/llm/OpenaiLlm');
vi.mock('@/modules/llm/ChatDeepSeekLlm');

describe('TranslateProducer', () => {
  let translateProducer: TranslateProducer;

  beforeEach(() => {
    translateProducer = new TranslateProducer();
  });

  test('checkTooltype returns correct tool types', () => {
    expect(translateProducer.checkTooltype('deepseek_local')).toBe('llm');
    expect(translateProducer.checkTooltype('google')).toBe('api');
    expect(translateProducer.checkTooltype('unknown')).toBeUndefined();
  });

  test('getTransTool returns LLM tool for valid LLM tools', () => {
    const tool = translateProducer.getTransTool('deepseek_local', {
      model: 'deepseek-coder',
      url: 'http://localhost:11434'
    });
    expect(tool).toBeDefined();
  });

  test('getTransTool throws error for LLM without config', () => {
    expect(() => {
      translateProducer.getTransTool('deepseek_local');
    }).toThrow('llmconfig is required');
  });
});

describe('CodeBlockPreservation', () => {
  let codeBlockPreservation: CodeBlockPreservation;

  beforeEach(() => {
    codeBlockPreservation = new CodeBlockPreservation();
  });

  test('extractCodeBlocksFromContent extracts code blocks correctly', () => {
    const content = `
      Here is some text.
      \`\`\`javascript
      console.log('Hello World');
      \`\`\`
      More text here.
      \`\`\`python
      print('Hello Python')
      \`\`\`
    `;

    const codeBlocks = codeBlockPreservation.extractCodeBlocksFromContent(content);
    expect(codeBlocks).toHaveLength(2);
    expect(codeBlocks[0].language).toBe('javascript');
    expect(codeBlocks[0].code).toContain('console.log');
    expect(codeBlocks[1].language).toBe('python');
    expect(codeBlocks[1].code).toContain('print');
  });

  test('replaceCodeBlocksWithPlaceholders works correctly', () => {
    const content = 'Text before ```js\ncode\n``` text after';
    const codeBlocks = codeBlockPreservation.extractCodeBlocksFromContent(content);
    const result = codeBlockPreservation.replaceCodeBlocksWithPlaceholders(content, codeBlocks);
    
    expect(result.contentWithPlaceholders).toContain('[[[CODE_BLOCK_0]]]');
    expect(result.placeholderMap['[[[CODE_BLOCK_0]]]']).toContain('code');
  });

  test('restoreCodeBlocksFromPlaceholders restores code blocks correctly', () => {
    const translatedContent = 'Translated text before [[[CODE_BLOCK_0]]] translated text after';
    const placeholderMap = {
      '[[[CODE_BLOCK_0]]]': '\n```javascript\nconsole.log("test");\n```\n'
    };

    const restored = codeBlockPreservation.restoreCodeBlocksFromPlaceholders(translatedContent, placeholderMap);
    expect(restored).toContain('console.log("test")');
    expect(restored).toContain('```javascript');
  });

  test('preserveDuringTranslation handles complete workflow', () => {
    const content = 'Text with ```js\nconst x = 1;\n``` more text';
    const result = codeBlockPreservation.preserveDuringTranslation(content);
    
    expect(result.codeBlocks).toHaveLength(1);
    expect(result.contentForTranslation).toContain('[[[CODE_BLOCK_0]]]');
    expect(result.placeholderMap).toHaveProperty('[[[CODE_BLOCK_0]]]');
  });
});

describe('ContentChunking', () => {
  const mockArticleContent = {
    title: 'Test Article',
    content: 'This is paragraph one.\n\nThis is paragraph two.\n\nThis is paragraph three.',
    codeBlocks: [
      {
        language: 'javascript',
        code: 'console.log("test");',
        position: 0,
        id: 'cb1',
        version: 1
      }
    ],
    metadata: {},
    images: [],
    sourceUrl: 'http://test.com',
    contentHash: 'hash123',
    scrapedAt: new Date(),
    version: 1
  };

  test('chunkArticle creates chunks correctly', () => {
    const chunks = ContentChunking.chunkArticle(mockArticleContent, 100);
    expect(chunks.length).toBeGreaterThan(0);
    expect(chunks[0]).toHaveProperty('id');
    expect(chunks[0]).toHaveProperty('content');
    expect(chunks[0]).toHaveProperty('type');
  });

  test('validateChunkSize returns valid chunk size', () => {
    expect(ContentChunking.validateChunkSize(1000)).toBe(1000);
    expect(ContentChunking.validateChunkSize(10000)).toBe(4000); // Max size
    expect(ContentChunking.validateChunkSize(100)).toBe(500); // Min size
  });

  test('getChunkStatistics returns correct statistics', () => {
    const chunks = [
      { id: '1', content: 'text', type: 'text', position: 0 },
      { id: '2', content: '```js\ncode\n```', type: 'code', position: 1 }
    ];
    
    const stats = ContentChunking.getChunkStatistics(chunks);
    expect(stats.totalChunks).toBe(2);
    expect(stats.textChunks).toBe(1);
    expect(stats.codeChunks).toBe(1);
  });
});

describe('TranslationQualityControl', () => {
  let qualityControl: TranslationQualityControl;

  beforeEach(() => {
    qualityControl = new TranslationQualityControl({
      minQualityScore: 0.7,
      autoRetry: true,
      maxRetries: 3,
      humanReviewThreshold: 0.6,
      retryWithDifferentTool: true,
      fallbackTools: ['deepseek_local', 'openai'],
      qualityCheckEnabled: true
    });
  });

  test('checkQuality returns correct result for good translation', async () => {
    const result = await qualityControl.checkQuality(
      'Hello world',
      'Hola mundo',
      { name: 'English', code: 'en' },
      { name: 'Spanish', code: 'es' },
      'deepseek_local'
    );

    expect(result).toHaveProperty('passed');
    expect(result).toHaveProperty('score');
    expect(result).toHaveProperty('issues');
    expect(result).toHaveProperty('recommendedAction');
  });

  test('checkQuality returns accept for disabled quality check', async () => {
    const disabledQC = new TranslationQualityControl({
      minQualityScore: 0.7,
      autoRetry: false,
      maxRetries: 3,
      humanReviewThreshold: 0.6,
      retryWithDifferentTool: false,
      fallbackTools: [],
      qualityCheckEnabled: false
    });

    const result = await disabledQC.checkQuality(
      'Hello world',
      'Hola mundo',
      { name: 'English', code: 'en' },
      { name: 'Spanish', code: 'es' },
      'deepseek_local'
    );

    expect(result.passed).toBe(true);
    expect(result.recommendedAction).toBe('accept');
  });

  test('updateConfig updates configuration correctly', () => {
    qualityControl.updateConfig({ minQualityScore: 0.8 });
    const config = qualityControl.getConfig();
    expect(config.minQualityScore).toBe(0.8);
  });
});

describe('TranslationMemory', () => {
  let translationMemory: TranslationMemory;

  beforeEach(() => {
    translationMemory = new TranslationMemory({
      enabled: true,
      minQualityScore: 0.7,
      maxMemorySize: 1000,
      autoCleanup: true,
      cleanupThreshold: 30,
      toolSpecificMemory: true
    });
  });

  test('getTranslation returns null when disabled', async () => {
    const disabledMemory = new TranslationMemory({
      enabled: false,
      minQualityScore: 0.7,
      maxMemorySize: 1000,
      autoCleanup: true,
      cleanupThreshold: 30,
      toolSpecificMemory: false
    });

    const result = await disabledMemory.getTranslation('hello', 'en', 'es');
    expect(result).toBeNull();
  });

  test('updateConfig updates configuration correctly', () => {
    translationMemory.updateConfig({ enabled: false });
    const config = translationMemory.getConfig();
    expect(config.enabled).toBe(false);
  });
});

describe('ArticleTranslationStrategy', () => {
  let strategy: ArticleTranslationStrategy;
  let mockTranslateProducer: TranslateProducer;

  beforeEach(() => {
    mockTranslateProducer = new TranslateProducer();
    strategy = new ArticleTranslationStrategy(mockTranslateProducer, {
      chunkSize: 2000,
      maxArticleLength: 10000,
      temperature: 0.3,
      qualityThreshold: 0.7,
      batchSize: 5,
      enableQualityControl: true,
      enableTranslationMemory: true,
      fallbackTools: ['deepseek_local'],
      retryAttempts: 3,
      preserveCodeBlocks: true,
      preserveFormatting: true
    });
  });

  test('updateConfig updates configuration correctly', () => {
    strategy.updateConfig({ chunkSize: 3000 });
    const config = strategy.getConfig();
    expect(config.chunkSize).toBe(3000);
  });

  test('getConfig returns current configuration', () => {
    const config = strategy.getConfig();
    expect(config.chunkSize).toBe(2000);
    expect(config.qualityThreshold).toBe(0.7);
  });
});

describe('ArticleTranslationService', () => {
  let service: ArticleTranslationService;
  let mockTranslateProducer: TranslateProducer;

  beforeEach(() => {
    mockTranslateProducer = new TranslateProducer();
    service = new ArticleTranslationService(mockTranslateProducer, {
      chunkSize: 2000,
      maxArticleLength: 10000,
      temperature: 0.3,
      qualityThreshold: 0.7,
      batchSize: 5,
      enableQualityControl: true,
      enableTranslationMemory: true,
      fallbackTools: ['deepseek_local'],
      retryAttempts: 3,
      preserveCodeBlocks: true,
      preserveFormatting: true,
      databaseEnabled: false,
      loggingEnabled: false,
      autoSave: false,
      saveIntermediateResults: false
    });
  });

  test('updateConfig updates configuration correctly', () => {
    service.updateConfig({ databaseEnabled: true });
    const config = service.getConfig();
    expect(config.databaseEnabled).toBe(true);
  });

  test('getConfig returns current configuration', () => {
    const config = service.getConfig();
    expect(config.databaseEnabled).toBe(false);
    expect(config.loggingEnabled).toBe(false);
  });

  test('getTranslationStrategy returns strategy instance', () => {
    const strategy = service.getTranslationStrategy();
    expect(strategy).toBeInstanceOf(ArticleTranslationStrategy);
  });
}); 