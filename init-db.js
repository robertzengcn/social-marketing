const { DataSource } = require('typeorm');
const path = require('path');

// Import entities directly
const { ArticleEntity } = require('./src/entity/Article.entity.ts');
const { ArticleCodeBlockEntity } = require('./src/entity/ArticleCodeBlock.entity.ts');
const { ArticleMetadataEntity } = require('./src/entity/ArticleMetadata.entity.ts');
const { ArticleImageEntity } = require('./src/entity/ArticleImage.entity.ts');
const { TranslationMemoryEntity } = require('./src/entity/TranslationMemory.entity.ts');
const { PublishResultEntity } = require('./src/entity/PublishResult.entity.ts');
const { PublishingQueueEntity } = require('./src/entity/PublishingQueue.entity.ts');
const { ArticleProcessingLogEntity } = require('./src/entity/ArticleProcessingLog.entity.ts');

async function initializeDatabase() {
  try {
    console.log('Initializing database...');
    
    const dbPath = path.join(__dirname, 'test-db');
    console.log('Database path:', dbPath);
    
    const dataSource = new DataSource({
      type: "better-sqlite3",
      database: path.join(dbPath, 'scraper.db'),
      entities: [
        ArticleEntity,
        ArticleCodeBlockEntity,
        ArticleMetadataEntity,
        ArticleImageEntity,
        TranslationMemoryEntity,
        PublishResultEntity,
        PublishingQueueEntity,
        ArticleProcessingLogEntity,
      ],
      synchronize: true,
      logging: true,
    });
    
    await dataSource.initialize();
    console.log('Database initialized successfully!');
    
    // Check if tables were created
    const tables = await dataSource.query("SELECT name FROM sqlite_master WHERE type='table'");
    console.log('Created tables:', tables.map(t => t.name));
    
    // Check for our new tables
    const newTables = ['articles', 'article_code_blocks', 'article_metadata', 'article_images', 
                      'translation_memory', 'publish_results', 'publishing_queue', 'article_processing_logs'];
    
    for (const tableName of newTables) {
      const exists = tables.some(t => t.name === tableName);
      console.log(`Table ${tableName}: ${exists ? '✓ Created' : '✗ Missing'}`);
    }
    
    await dataSource.destroy();
    console.log('Database connection closed.');
    
  } catch (error) {
    console.error('Database initialization failed:', error);
  }
}

initializeDatabase(); 