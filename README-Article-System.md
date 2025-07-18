# Article Scraping, Translation & Publishing System

## Overview

The Article Scraping, Translation & Publishing System is a comprehensive solution for automating the process of scraping articles from various sources, translating them using AI models, and publishing them to multiple platforms. This system is designed to handle the entire workflow from content discovery to publication.

## Features

### 🎯 Core Functionality
- **Article Scraping**: Extract content from Toutiao, Baidu, and other platforms
- **AI Translation**: Multi-language translation with code block preservation
- **Multi-Platform Publishing**: Publish to Toutiao, Baidu, and other platforms
- **Queue Management**: Intelligent scheduling and retry mechanisms
- **Translation Memory**: Improve translation quality and consistency
- **Quality Control**: Automated quality scoring and validation

### 🔧 Technical Features
- **Strategy Pattern**: Extensible scraping and publishing strategies
- **Database Integration**: Full TypeORM integration with SQLite
- **UI Management**: Complete Vue.js frontend with Vuetify
- **Error Handling**: Comprehensive error handling and logging
- **Rate Limiting**: Built-in rate limiting and proxy support
- **Content Processing**: Code block extraction and metadata handling

## Architecture

### System Components

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Article       │    │   Translation   │    │   Publishing    │
│   Scraping      │    │   Module        │    │   Module        │
│   Module        │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Database Layer                               │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ │
│  │   Article   │ │Translation  │ │Publishing   │ │Processing   │ │
│  │   Entity    │ │Memory       │ │Queue        │ │Logs         │ │
│  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘ │
└─────────────────────────────────────────────────────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────────────────────────────────────────────────────┐
│                    UI Layer                                     │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ │
│  │   Article   │ │Translation  │ │Publishing   │ │Queue        │ │
│  │   List      │ │Page         │ │Page         │ │Management   │ │
│  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

### Module Structure

#### 1. Article Scraping Module (`src/modules/scraping/`)
- **ArticleScraper**: Main orchestrator for scraping operations
- **ScrapingStrategy**: Base interface for scraping strategies
- **ToutiaoScrapingStrategy**: Toutiao-specific scraping implementation
- **BaiduScrapingStrategy**: Baidu-specific scraping implementation
- **CodeBlockExtractor**: Utility for extracting and preserving code blocks
- **RateLimiter**: Rate limiting and proxy management

#### 2. Translation Module (`src/modules/translation/`)
- **ArticleTranslationService**: Main translation service
- **ArticleTranslationStrategy**: Translation strategy implementation
- **ContentChunking**: Intelligent content chunking for large articles
- **TranslationMemory**: Translation memory management
- **TranslationQualityControl**: Quality scoring and validation

#### 3. Publishing Module (`src/modules/publishing/`)
- **ArticlePublishService**: Main publishing service
- **ArticlePublishStrategy**: Base publishing strategy
- **ToutiaoPublishStrategy**: Toutiao publishing implementation
- **BaiduPublishStrategy**: Baidu publishing implementation
- **PublishingQueue**: Queue management and scheduling

#### 4. Database Models (`src/model/`)
- **ArticleModel**: Article database operations
- **TranslationMemoryModel**: Translation memory operations
- **PublishResultModel**: Publishing results operations
- **PublishingQueueModel**: Queue management operations
- **ArticleProcessingLogModel**: Processing logs operations

#### 5. UI Components (`src/views/pages/article/`)
- **list.vue**: Article management interface
- **detail.vue**: Article detail view
- **scrape.vue**: Article scraping interface
- **translate.vue**: Translation management interface
- **publish.vue**: Publishing interface
- **queue.vue**: Queue management interface

## Installation & Setup

### Prerequisites
- Node.js 18+
- TypeScript 5+
- Vue.js 3+
- Vuetify 3+
- TypeORM
- SQLite

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd social-marketing
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Database setup**
   ```bash
   # The database will be automatically created on first run
   npm run dev
   ```

4. **Configure environment**
   ```bash
   # Copy and configure environment variables
   cp .env.example .env
   ```

## Usage

### 1. Article Scraping

#### Single Article Scraping
```typescript
import { ArticleScraper } from '@/modules/scraping/ArticleScraper';

const scraper = new ArticleScraper();
const result = await scraper.scrapeArticle({
  url: 'https://toutiao.com/article/123',
  strategy: 'toutiao',
  targetLanguage: 'zh',
  extractCodeBlocks: true,
  extractImages: true,
  extractMetadata: true
});
```

#### Batch Scraping
```typescript
const urls = [
  'https://toutiao.com/article/123',
  'https://baidu.com/article/456'
];

const results = await scraper.scrapeBatch(urls, {
  strategy: 'auto',
  targetLanguage: 'zh'
});
```

### 2. Article Translation

#### Single Article Translation
```typescript
import { ArticleTranslationService } from '@/modules/translation/ArticleTranslationService';

const translationService = new ArticleTranslationService();
const result = await translationService.translateArticle(articleId, {
  targetLanguage: 'zh',
  translationEngine: 'gpt-4',
  qualityLevel: 'high',
  preserveCodeBlocks: true,
  useTranslationMemory: true
});
```

#### Batch Translation
```typescript
const articleIds = [1, 2, 3, 4, 5];
const results = await translationService.translateBatch(articleIds, {
  targetLanguage: 'zh',
  translationEngine: 'gpt-4'
});
```

### 3. Article Publishing

#### Single Article Publishing
```typescript
import { ArticlePublishService } from '@/modules/publishing/ArticlePublishService';

const publishService = new ArticlePublishService();
const result = await publishService.publishArticle({
  articleId: 1,
  platform: 'toutiao',
  accountId: 1,
  scheduledAt: new Date(),
  priority: 5
});
```

#### Batch Publishing
```typescript
const requests = [
  { articleId: 1, platform: 'toutiao', accountId: 1 },
  { articleId: 2, platform: 'baidu', accountId: 2 }
];

const results = await publishService.publishBatch(requests);
```

## Configuration

### Scraping Configuration
```typescript
const scrapingConfig = {
  timeout: 30000,
  userAgent: 'Mozilla/5.0...',
  rateLimit: {
    requestsPerMinute: 60,
    delayBetweenRequests: 1000
  },
  proxy: {
    enabled: true,
    proxyList: ['http://proxy1:8080', 'http://proxy2:8080']
  }
};
```

### Translation Configuration
```typescript
const translationConfig = {
  engines: {
    'gpt-4': {
      apiKey: process.env.OPENAI_API_KEY,
      model: 'gpt-4',
      maxTokens: 4000
    },
    'claude': {
      apiKey: process.env.CLAUDE_API_KEY,
      model: 'claude-3-sonnet'
    }
  },
  chunking: {
    maxChunkSize: 200,
    overlapSize: 50
  },
  quality: {
    minScore: 0.8,
    autoRetry: true,
    maxRetries: 3
  }
};
```

### Publishing Configuration
```typescript
const publishingConfig = {
  platforms: {
    toutiao: {
      baseUrl: 'https://mp.toutiao.com',
      loginUrl: 'https://mp.toutiao.com/login',
      publishUrl: 'https://mp.toutiao.com/pgc/maudit/publish/'
    },
    baidu: {
      baseUrl: 'https://baijiahao.baidu.com',
      loginUrl: 'https://baijiahao.baidu.com/login',
      publishUrl: 'https://baijiahao.baidu.com/builder/rc/edit'
    }
  },
  queue: {
    maxConcurrent: 3,
    retryAttempts: 3,
    retryDelay: 5000
  }
};
```

## Database Schema

### Article Entity
```sql
CREATE TABLE articles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  original_content TEXT NOT NULL,
  translated_content TEXT,
  source_url TEXT NOT NULL,
  content_hash TEXT NOT NULL,
  status TEXT NOT NULL,
  source_language TEXT,
  target_language TEXT,
  version INTEGER DEFAULT 1,
  scraped_at DATETIME,
  translated_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Translation Memory Entity
```sql
CREATE TABLE translation_memory (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  source_text TEXT NOT NULL,
  translated_text TEXT NOT NULL,
  source_language TEXT NOT NULL,
  target_language TEXT NOT NULL,
  quality_score REAL DEFAULT 0.8,
  usage_count INTEGER DEFAULT 1,
  unique_key TEXT NOT NULL,
  tool_used TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  last_used_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Publishing Queue Entity
```sql
CREATE TABLE publishing_queue (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  article_id INTEGER NOT NULL,
  platform_name TEXT NOT NULL,
  account_id INTEGER NOT NULL,
  status TEXT NOT NULL,
  priority INTEGER DEFAULT 0,
  scheduled_at DATETIME NOT NULL,
  retry_count INTEGER DEFAULT 0,
  last_attempt_at DATETIME,
  error_message TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## API Endpoints

### Article Management
- `GET /api/articles` - List articles with filtering
- `GET /api/articles/:id` - Get article details
- `POST /api/articles` - Create new article
- `PUT /api/articles/:id` - Update article
- `DELETE /api/articles/:id` - Delete article

### Scraping
- `POST /api/scraping/scrape` - Scrape single article
- `POST /api/scraping/batch` - Batch scraping
- `GET /api/scraping/strategies` - Get available strategies

### Translation
- `POST /api/translation/translate` - Translate article
- `POST /api/translation/batch` - Batch translation
- `GET /api/translation/memory` - Get translation memory
- `DELETE /api/translation/memory/:id` - Delete translation memory entry

### Publishing
- `POST /api/publishing/publish` - Publish article
- `POST /api/publishing/batch` - Batch publishing
- `GET /api/publishing/queue` - Get publishing queue
- `PUT /api/publishing/queue/:id` - Update queue item
- `DELETE /api/publishing/queue/:id` - Remove from queue

## Error Handling

The system implements comprehensive error handling:

### Scraping Errors
- Network timeouts
- Rate limiting
- Invalid URLs
- Content extraction failures
- Platform changes

### Translation Errors
- API quota exceeded
- Invalid content format
- Quality check failures
- Memory lookup failures

### Publishing Errors
- Authentication failures
- Platform API changes
- Content validation errors
- Network connectivity issues

## Monitoring & Logging

### Processing Logs
All operations are logged with detailed information:
- Operation type (scrape, translate, publish)
- Status (success, error, warning)
- Timestamp and duration
- Error details and stack traces

### Metrics
- Success/failure rates
- Processing times
- Queue statistics
- Translation quality scores
- Platform-specific metrics

## Security Considerations

### Data Protection
- Content encryption for sensitive data
- Secure API key management
- User authentication and authorization
- Rate limiting to prevent abuse

### Platform Compliance
- Respect robots.txt files
- Implement proper delays between requests
- Use legitimate user agents
- Follow platform terms of service

## Performance Optimization

### Caching
- Translation memory caching
- Article content caching
- Platform session caching
- Database query optimization

### Scalability
- Queue-based processing
- Concurrent operation limits
- Database connection pooling
- Memory usage optimization

## Troubleshooting

### Common Issues

1. **Scraping Failures**
   - Check network connectivity
   - Verify URL accessibility
   - Review rate limiting settings
   - Check for platform changes

2. **Translation Errors**
   - Verify API key validity
   - Check API quota limits
   - Review content format
   - Validate language codes

3. **Publishing Issues**
   - Verify account credentials
   - Check platform availability
   - Review content guidelines
   - Monitor queue status

### Debug Mode
Enable debug logging:
```typescript
const debugConfig = {
  logging: {
    level: 'debug',
    enableConsole: true,
    enableFile: true
  }
};
```

## Contributing

### Development Setup
1. Fork the repository
2. Create a feature branch
3. Implement changes with tests
4. Submit a pull request

### Code Standards
- Follow TypeScript best practices
- Use ESLint and Prettier
- Write comprehensive tests
- Document new features

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions:
- Create an issue on GitHub
- Check the documentation
- Review the troubleshooting guide
- Contact the development team

---

**Note**: This system is designed for educational and research purposes. Please ensure compliance with all applicable laws and platform terms of service when using this system. 