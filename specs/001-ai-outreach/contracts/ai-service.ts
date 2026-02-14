# AI Service API Contracts

**Purpose**: Define interfaces for the remote AI service that generates personalized outreach messages.
**Location**: `src/api/ai-outreach-api.ts`

---

## API Client Interface

```typescript
/**
 * AI Service client for generating personalized outreach messages
 * Communicates with remote AI server via REST API
 */
export interface AIOutreachService {
    /**
     * Generate a single personalized message
     * @param request - Message generation request
     * @returns Generated message with metadata
     */
    generateMessage(request: AIMessageRequest): Promise<AIMessageResponse>;

    /**
     * Generate multiple messages in batch
     * @param requests - Array of message generation requests
     * @returns Array of generated messages
     */
    generateBatchMessages(requests: AIMessageRequest[]): Promise<AIMessageResponse[]>;

    /**
     * Validate generated message quality
     * @param message - Message content to validate
     * @returns Validation result with score and feedback
     */
    validateMessage(message: string): Promise<MessageValidationResponse>;

    /**
     * Get service health and status
     * @returns Service status information
     */
    getServiceStatus(): Promise<ServiceStatusResponse>;
}
```

---

## Request/Response Types

### Message Generation Request

```typescript
/**
 * Request to generate personalized outreach message
 */
export interface AIMessageRequest {
    /**
     * Contact's email address (for personalization)
     */
    contactEmail: string;

    /**
     * Contact's name (if available)
     */
    contactName?: string;

    /**
     * Contact's website URL (for context)
     */
    websiteUrl?: string;

    /**
     * Custom message template to use
     * Supports placeholders: {{email}}, {{name}}, {{website}}
     */
    template?: string;

    /**
     * Custom prompt for AI (overrides template)
     */
    customPrompt?: string;

    /**
     * Desired message tone
     */
    tone?: MessageTone;

    /**
     * Message length preference
     */
    length?: MessageLength;

    /**
     * Industry or niche context (for better personalization)
     */
    industry?: string;

    /**
     * Additional context or notes
     */
    context?: string;
}

/**
 * Message tone options
 */
export type MessageTone =
    | 'professional'      // Formal business tone
    | 'casual'            // Friendly, informal tone
    | 'friendly'          // Warm and approachable
    | 'persuasive'        // Sales-oriented
    | 'direct';           // Straight to the point

/**
 * Message length preferences
 */
export type MessageLength =
    | 'short'             // 50-100 words
    | 'medium'            // 100-200 words (default)
    | 'long';             // 200-300 words
```

### Message Generation Response

```typescript
/**
 * Response from AI service with generated message
 */
export interface AIMessageResponse {
    /**
     * Generated message content
     */
    message: string;

    /**
     * Generation success status
     */
    success: boolean;

    /**
     * Error message if generation failed
     */
    error?: string;

    /**
     * AI metadata
     */
    metadata?: AIMetadata;

    /**
     * Quality score (0-1)
     */
    qualityScore?: number;

    /**
     * Suggestions for improvement (if quality score is low)
     */
    suggestions?: string[];
}

/**
 * AI generation metadata
 */
export interface AIMetadata {
    /**
     * AI model used (e.g., "gpt-4", "claude-3")
     */
    model: string;

    /**
     * Tokens used for generation
     */
    tokens: number;

    /**
     * Generation timestamp
     */
    timestamp: number;

    /**
     * Time taken to generate (milliseconds)
     */
    duration?: number;

    /**
     * Temperature setting used
     */
    temperature?: number;

    /**
     * System prompt used
     */
    systemPrompt?: string;
}
```

---

## Message Validation

```typescript
/**
 * Request to validate message quality
 */
export interface MessageValidationRequest {
    /**
     * Message content to validate
     */
    message: string;

    /**
     * Validation criteria
     */
    criteria?: ValidationCriteria;
}

/**
 * Validation criteria
 */
export interface ValidationCriteria {
    /**
     * Minimum word count
     */
    minWords?: number;

    /**
     * Maximum word count
     */
    maxWords?: number;

    /**
     * Check for spam indicators
     */
    checkSpam?: boolean;

    /**
     * Check for personalization
     */
    checkPersonalization?: boolean;

    /**
     * Check for appropriate tone
     */
    checkTone?: boolean;

    /**
     * Target tone
     */
    targetTone?: MessageTone;
}

/**
 * Message validation response
 */
export interface MessageValidationResponse {
    /**
     * Overall validation result
     */
    isValid: boolean;

    /**
     * Quality score (0-1)
     */
    score: number;

    /**
     * Detailed validation results
     */
    details: ValidationDetails;

    /**
     * Suggestions for improvement
     */
    suggestions?: string[];
}

/**
 * Detailed validation results
 */
export interface ValidationDetails {
    /**
     * Word count validation
     */
    wordCount: {
        valid: boolean;
        actual: number;
        min?: number;
        max?: number;
    };

    /**
     * Spam indicator check
     */
    spamCheck: {
        valid: boolean;
        indicators?: string[];  // E.g., ["ALL CAPS", "Excessive !!!"]
    };

    /**
     * Personalization check
     */
    personalizationCheck: {
        valid: boolean;
        hasPersonalization: boolean;  // E.g., uses {{name}}, {{website}}
        score?: number;  // 0-1
    };

    /**
     * Tone check
     */
    toneCheck: {
        valid: boolean;
        detectedTone?: MessageTone;
        confidence?: number;  // 0-1
    };

    /**
     * Grammar and style check
     */
    grammarCheck: {
        valid: boolean;
        errors?: GrammarError[];
    };
}

/**
 * Grammar error details
 */
export interface GrammarError {
    type: 'spelling' | 'grammar' | 'punctuation' | 'style';
    message: string;
    position?: {
        line: number;
        column: number;
    };
    suggestion?: string;
}
```

---

## Service Status

```typescript
/**
 * Service status response
 */
export interface ServiceStatusResponse {
    /**
     * Service availability
     */
    isAvailable: boolean;

    /**
     * Service health (0-1)
     */
    health: number;

    /**
     * Current model in use
     */
    model: string;

    /**
     * Average response time (milliseconds)
     */
    averageResponseTime?: number;

    /**
     * Rate limit information
     */
    rateLimit?: {
        requestsPerMinute: number;
        remaining: number;
        resetAt: number;  // Timestamp
    };

    /**
     * Error message if service is unavailable
     */
    error?: string;
}
```

---

## Error Handling

```typescript
/**
 * AI service error types
 */
export enum AIServiceError {
    /**
     * Network or connection error
     */
    NETWORK_ERROR = 'NETWORK_ERROR',

    /**
     * Authentication failed
     */
    AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR',

    /**
     * Rate limit exceeded
     */
    RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',

    /**
     * Invalid request parameters
     */
    INVALID_REQUEST = 'INVALID_REQUEST',

    /**
     * AI generation failed
     */
    GENERATION_FAILED = 'GENERATION_FAILED',

    /**
     * Service temporarily unavailable
     */
    SERVICE_UNAVAILABLE = 'SERVICE_UNAVAILABLE',

    /**
     * Request timeout
     */
    TIMEOUT = 'TIMEOUT'
}

/**
 * Standard error response
 */
export interface AIServiceErrorResponse {
    success: false;
    error: string;
    errorCode: AIServiceError;
    details?: any;
    retryable: boolean;  // Whether request can be retried
}
```

---

## Implementation: AI Outreach API Client

```typescript
/**
 * Concrete implementation of AI service client
 */
export class AIOutreachAPIClient implements AIOutreachService {
    private baseUrl: string;
    private apiKey: string;
    private timeout: number;
    private maxRetries: number;

    constructor(config: AIOutreachConfig) {
        this.baseUrl = config.baseUrl;
        this.apiKey = config.apiKey;
        this.timeout = config.timeout || 30000;  // 30 seconds default
        this.maxRetries = config.maxRetries || 3;
    }

    /**
     * Generate single message with retry logic
     */
    async generateMessage(request: AIMessageRequest): Promise<AIMessageResponse> {
        return this.retryWithBackoff(
            () => this._generateMessage(request),
            this.maxRetries
        );
    }

    /**
     * Generate batch messages
     */
    async generateBatchMessages(
        requests: AIMessageRequest[]
    ): Promise<AIMessageResponse[]> {
        // Process in parallel with concurrency limit
        const concurrency = 5;  // Max 5 concurrent requests

        const results = await pmap(
            requests,
            request => this.generateMessage(request),
            { concurrency }
        );

        return results;
    }

    /**
     * Validate message quality
     */
    async validateMessage(message: string): Promise<MessageValidationResponse> {
        try {
            const response = await fetch(`${this.baseUrl}/api/validate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`
                },
                body: JSON.stringify({ message }),
                signal: AbortSignal.timeout(this.timeout)
            });

            if (!response.ok) {
                throw new Error(`Validation failed: ${response.statusText}`);
            }

            return await response.json();

        } catch (error) {
            throw this.handleError(error);
        }
    }

    /**
     * Get service status
     */
    async getServiceStatus(): Promise<ServiceStatusResponse> {
        try {
            const response = await fetch(`${this.baseUrl}/api/status`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`
                },
                signal: AbortSignal.timeout(this.timeout)
            });

            if (!response.ok) {
                throw new Error(`Status check failed: ${response.statusText}`);
            }

            return await response.json();

        } catch (error) {
            return {
                isAvailable: false,
                health: 0,
                model: 'unknown',
                error: error.message
            };
        }
    }

    /**
     * Internal message generation implementation
     */
    private async _generateMessage(request: AIMessageRequest): Promise<AIMessageResponse> {
        try {
            const response = await fetch(`${this.baseUrl}/api/generate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`
                },
                body: JSON.stringify(request),
                signal: AbortSignal.timeout(this.timeout)
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Generation failed');
            }

            return await response.json();

        } catch (error) {
            throw this.handleError(error);
        }
    }

    /**
     * Retry with exponential backoff
     */
    private async retryWithBackoff<T>(
        fn: () => Promise<T>,
        maxRetries: number
    ): Promise<T> {
        for (let attempt = 0; attempt < maxRetries; attempt++) {
            try {
                return await fn();
            } catch (error) {
                if (attempt === maxRetries - 1) {
                    throw error;  // Final attempt failed
                }

                // Exponential backoff: 1s, 2s, 4s, ...
                const delay = Math.pow(2, attempt) * 1000;
                await this.sleep(delay);
            }
        }
        throw new Error('Max retries exceeded');
    }

    /**
     * Handle and classify errors
     */
    private handleError(error: Error): AIServiceErrorResponse {
        if (error.name === 'AbortError' || error.message.includes('timeout')) {
            return {
                success: false,
                error: 'Request timeout',
                errorCode: AIServiceError.TIMEOUT,
                retryable: true
            };
        }

        if (error.message.includes('rate limit')) {
            return {
                success: false,
                error: error.message,
                errorCode: AIServiceError.RATE_LIMIT_EXCEEDED,
                retryable: true
            };
        }

        if (error.message.includes('auth')) {
            return {
                success: false,
                error: error.message,
                errorCode: AIServiceError.AUTHENTICATION_ERROR,
                retryable: false
            };
        }

        if (error.message.includes('network')) {
            return {
                success: false,
                error: error.message,
                errorCode: AIServiceError.NETWORK_ERROR,
                retryable: true
            };
        }

        return {
            success: false,
            error: error.message,
            errorCode: AIServiceError.GENERATION_FAILED,
            retryable: true
        };
    }

    /**
     * Sleep utility
     */
    private sleep(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

/**
 * Configuration for AI service client
 */
export interface AIOutreachConfig {
    baseUrl: string;
    apiKey: string;
    timeout?: number;
    maxRetries?: number;
}
```

---

## Usage Examples

### Example 1: Generate Single Message

```typescript
// In src/modules/outreach/OutreachModule.ts

const aiClient = new AIOutreachAPIClient({
    baseUrl: 'https://ai-service.example.com',
    apiKey: 'your-api-key',
    timeout: 30000,
    maxRetries: 3
});

const request: AIMessageRequest = {
    contactEmail: 'john@example.com',
    contactName: 'John Doe',
    websiteUrl: 'https://johndoe.com',
    template: 'Hi {{name}}, I came across your website {{websiteUrl}} and was impressed by...',
    tone: 'professional',
    length: 'medium',
    industry: 'E-commerce'
};

const response = await aiClient.generateMessage(request);

if (response.success) {
    console.log('Generated message:', response.message);
    console.log('Quality score:', response.qualityScore);
    console.log('Tokens used:', response.metadata?.tokens);

    // Save to database
    await saveMessage(contactId, response.message, response.metadata);
} else {
    console.error('Generation failed:', response.error);
}
```

### Example 2: Batch Generation

```typescript
// In message generation worker

const contacts = await getContactsByStatus('pending');

const requests: AIMessageRequest[] = contacts.map(contact => ({
    contactEmail: contact.email,
    contactName: contact.name,
    websiteUrl: contact.websiteUrl,
    tone: 'professional',
    length: 'medium'
}));

const responses = await aiClient.generateBatchMessages(requests);

// Process results
responses.forEach((response, index) => {
    const contact = contacts[index];

    if (response.success) {
        // Save generated message
        saveMessage(contact.id, response.message, response.metadata);
    } else {
        // Log failure
        console.error(`Failed to generate for ${contact.email}:`, response.error);
    }
});

// Summary
const succeeded = responses.filter(r => r.success).length;
console.log(`Generated ${succeeded}/${responses.length} messages`);
```

### Example 3: Validate Message

```typescript
// Before sending to user

const validation = await aiClient.validateMessage(message);

if (validation.isValid) {
    console.log(`Message quality score: ${validation.score}`);
    // Send to user
} else {
    console.log('Message validation failed:');
    console.log('- Word count:', validation.details.wordCount);
    console.log('- Spam check:', validation.details.spamCheck);
    console.log('- Suggestions:', validation.suggestions);
}
```

### Example 4: Service Health Check

```typescript
// Check AI service availability before batch generation

const status = await aiClient.getServiceStatus();

if (!status.isAvailable) {
    console.error('AI service unavailable:', status.error);
    // Reschedule task or notify user
    return;
}

if (status.health < 0.8) {
    console.warn('AI service health is low:', status.health);
    // Proceed with caution
}

if (status.rateLimit && status.rateLimit.remaining < 10) {
    console.warn('Approaching rate limit:', status.rateLimit.remaining);
    // Throttle requests or wait
}
```

---

## Integration with Existing AI Infrastructure

```typescript
/**
 * Extend existing AI module to support outreach
 * In src/modules/ai/outreach.ts
 */

import { AIOutreachAPIClient } from '../../api/ai-outreach-api';
import { getAIConfig } from './config';

/**
 * Outreach AI service wrapper
 */
export class OutreachAIService {
    private client: AIOutreachAPIClient;

    constructor() {
        const config = getAIConfig();
        this.client = new AIOutreachAPIClient({
            baseUrl: config.outreach.baseUrl,
            apiKey: config.outreach.apiKey
        });
    }

    /**
     * Generate personalized message
     */
    async generateMessage(request: AIMessageRequest): Promise<string> {
        const response = await this.client.generateMessage(request);

        if (!response.success) {
            throw new Error(response.error || 'Generation failed');
        }

        // Validate quality
        if (response.qualityScore && response.qualityScore < 0.6) {
            console.warn('Low quality score:', response.qualityScore);
            console.warn('Suggestions:', response.suggestions);
        }

        return response.message;
    }

    /**
     * Generate messages for batch of contacts
     */
    async generateBatchMessages(contacts: OutContactEntity[]): Promise<Map<number, string>> {
        const requests = contacts.map(c => ({
            contactEmail: c.email,
            contactName: c.name || undefined,
            websiteUrl: c.website_url || undefined
        }));

        const responses = await this.client.generateBatchMessages(requests);

        const results = new Map<number, string>();

        responses.forEach((response, index) => {
            if (response.success) {
                results.set(contacts[index].id, response.message);
            }
        });

        return results;
    }
}
```
