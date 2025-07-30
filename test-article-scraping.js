// Simple test script to verify article scraping functionality
const { ArticleController } = require('./dist/controller/ArticleController.js');

async function testArticleScraping() {
  console.log('Testing article scraping functionality...');
  
  try {
    const controller = new ArticleController();
    
    // Test URL validation
    console.log('Testing URL validation...');
    const validUrl = 'https://toutiao.com/article/123';
    const invalidUrl = 'https://unsupported-site.com/article';
    
    console.log(`Valid URL (${validUrl}): ${controller.validateUrl(validUrl)}`);
    console.log(`Invalid URL (${invalidUrl}): ${controller.validateUrl(invalidUrl)}`);
    
    // Test supported domains
    console.log('Supported domains:', controller.getSupportedDomains());
    
    // Test scraping stats
    console.log('Getting scraping stats...');
    const stats = await controller.getScrapingStats();
    console.log('Scraping stats:', stats);
    
    console.log('✅ Article scraping functionality test completed successfully!');
    
  } catch (error) {
    console.error('❌ Article scraping test failed:', error);
  }
}

testArticleScraping(); 