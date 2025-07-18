import 'reflect-metadata';
import { SqliteDb } from './src/config/SqliteDb';
import path from 'path';

async function testDatabaseInitialization() {
  try {
    console.log('Testing database initialization...');
    
    // Use a test database path
    const testDbPath = path.join(__dirname, 'test-db');
    console.log('Database path:', testDbPath);
    
    // Get database instance
    const db = SqliteDb.getInstance(testDbPath);
    
    // Initialize the connection
    if (!db.connection.isInitialized) {
      console.log('Initializing database connection...');
      await db.connection.initialize();
      console.log('Database connection initialized successfully!');
    } else {
      console.log('Database connection already initialized.');
    }
    
    // Test if tables were created
    const tables = await db.connection.query("SELECT name FROM sqlite_master WHERE type='table'");
    console.log('Created tables:', tables.map((t: any) => t.name));
    
    // Check for our new tables
    const newTables = ['articles', 'article_code_blocks', 'article_metadata', 'article_images', 
                      'translation_memory', 'publish_results', 'publishing_queue', 'article_processing_logs'];
    
    for (const tableName of newTables) {
      const exists = tables.some((t: any) => t.name === tableName);
      console.log(`Table ${tableName}: ${exists ? '✓ Created' : '✗ Missing'}`);
    }
    
    console.log('Database initialization test completed!');
    
  } catch (error) {
    console.error('Database initialization failed:', error);
  }
}

testDatabaseInitialization(); 