# LinkedIn Scraper Examples

This directory contains example scripts demonstrating how to use the LinkedInScraper.

## Available Examples

### `linkedin-scraper-example.ts`

Comprehensive examples showing:

1. **Factory Usage** - Using OutreachScrapingFactory to automatically detect and use LinkedInScraper
2. **Direct Usage** - Creating LinkedInScraper instances directly
3. **Batch Scraping** - Scraping multiple LinkedIn profiles with proper delays
4. **Error Handling** - Handling LinkedIn-specific errors (sign-in walls, CAPTCHAs, etc.)
5. **Custom Options** - Configuring scraper for different scenarios (conservative, balanced, aggressive)

## Running the Examples

### Prerequisites

```bash
# Install dependencies
yarn install

# Install ts-node for running TypeScript directly
yarn add -D ts-node
```

### Run the Examples

```bash
# Run all examples
npx ts-node examples/linkedin-scraper-example.ts

# Or with yarn
yarn ts-node examples/linkedin-scraper-example.ts
```

## Quick Start

### Scraping a LinkedIn Profile

```typescript
import { OutreachScrapingFactory } from '../src/strategy/OutreachScrapingFactory';

const options = {
    aggressiveMode: false,
    maxConcurrency: 1,
    useProxy: false,
    delayMs: 2000,
    maxPagesPerSite: 10,
    followLinks: false,
    extractEmails: true,
    extractUrls: true,
    timeout: 30000
};

// Factory automatically detects LinkedIn URL
const scraper = OutreachScrapingFactory.createScraper(
    'https://linkedin.com/in/johndoe',
    options
);

const result = await scraper.scrape('https://linkedin.com/in/johndoe', options);

console.log('Contacts found:', result.contacts.length);
result.contacts.forEach(contact => {
    console.log('- Name:', contact.name);
    console.log('- Email:', contact.email);
    console.log('- Website:', contact.websiteUrl);
});
```

### Batch Scraping

```typescript
const urls = [
    'https://linkedin.com/in/user1',
    'https://linkedin.com/in/user2',
    'https://linkedin.com/company/acme'
];

for (const url of urls) {
    const scraper = OutreachScrapingFactory.createScraper(url, options);
    const result = await scraper.scrape(url, options);

    console.log(`${url}: ${result.contacts.length} contacts`);

    // Important: Delay between requests to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 2000));
}
```

## Configuration

### Recommended Settings for LinkedIn

```typescript
const linkedInOptions = {
    aggressiveMode: false,      // LinkedIn blocks aggressive scraping
    maxConcurrency: 1,          // LinkedIn blocks concurrent requests
    delayMs: 2000,              // 2-3 second delay recommended
    timeout: 30000,             // 30 second timeout
    extractEmails: true,        // Extract emails (if publicly visible)
    extractUrls: true,          // Extract website URLs
    followLinks: false,         // Don't follow links on LinkedIn
    useProxy: false             // Enable proxy for large-scale operations
};
```

## Important Notes

⚠️ **LinkedIn Scraping Considerations**:

1. **Terms of Service**: Ensure your scraping complies with LinkedIn's Terms of Service
2. **Rate Limiting**: LinkedIn has strict rate limits - use conservative delays (2000ms+)
3. **Authentication**: Many profiles require login to view full contact information
4. **Anti-Bot Detection**: LinkedIn has sophisticated anti-bot measures
5. **Legal Compliance**: Check local laws regarding web scraping (e.g., GDPR, CCPA)

## Common Issues

### "Sign-in wall detected"

**Cause**: LinkedIn requires login to view this profile

**Solutions**:
- Try public profiles only
- Implement authentication (requires additional setup)
- Use LinkedIn API for authorized access

### "CAPTCHA detected"

**Cause**: LinkedIn's anti-bot system triggered

**Solutions**:
- Increase delay between requests (3000ms+)
- Use proxy rotation
- Reduce request frequency
- Implement CAPTCHA solving service

### "No contacts found"

**Cause**: Profile may not have publicly visible contact information

**Solutions**:
- Verify the profile has public contact info
- Check if the profile exists
- Ensure you're not rate-limited

## Advanced Usage

### Custom Scraping Strategy

```typescript
import { LinkedInScraper } from '../src/strategy/LinkedInScraper';

const scraper = new LinkedInScraper(options);

// Validate URL first
if (scraper.validateUrl(url)) {
    const result = await scraper.scrape(url, options);
    // Process results...
}
```

### Error Handling

```typescript
const scraper = OutreachScrapingFactory.createScraper(url, options);

try {
    const result = await scraper.scrape(url, options);

    if (!result.success) {
        console.error('Scraping failed:', result.errors);

        result.errors?.forEach(error => {
            console.error(`- ${error.type}: ${error.error}`);

            switch (error.type) {
                case 'BLOCKED':
                    // Handle blocked access
                    break;
                case 'CAPTCHA':
                    // Handle CAPTCHA
                    break;
                case 'TIMEOUT':
                    // Handle timeout
                    break;
            }
        });
    }
} catch (error) {
    console.error('Unexpected error:', error);
}
```

## Support

For issues or questions:
- Check the main documentation: `doc/article-scraping-guide.md`
- Review the source code: `src/strategy/LinkedInScraper.ts`
- See example tests: `test/modules/outreach/linkedin-scraper.test.ts`
