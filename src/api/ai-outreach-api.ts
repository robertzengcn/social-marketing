/**
 * AI Service client for generating personalized outreach messages
 * Communicates with remote AI server via REST API
 */
export interface AIOutreachService {
    /**
     * Generate a single personalized message
     */
    generateMessage(request: AIMessageRequest): Promise<AIMessageResponse>;

    /**
     * Generate multiple messages in batch
     */
    generateBatchMessages(requests: AIMessageRequest[]): Promise<AIMessageResponse[]>;

    /**
     * Validate generated message quality
     */
    validateMessage(message: string): Promise<MessageValidationResponse>;

    /**
     * Get service health and status
     */
    getServiceStatus(): Promise<ServiceStatusResponse>;
}

export interface AIMessageRequest {
    contactEmail: string;
    contactName?: string;
    websiteUrl?: string;
    template?: string;
    customPrompt?: string;
    tone?: MessageTone;
    length?: MessageLength;
    industry?: string;
    context?: string;
}

export type MessageTone =
    | 'professional'
    | 'casual'
    | 'friendly'
    | 'persuasive'
    | 'direct';

export type MessageLength =
    | 'short'
    | 'medium'
    | 'long';

export interface AIMessageResponse {
    message: string;
    success: boolean;
    error?: string;
    metadata?: AIMetadata;
    qualityScore?: number;
    suggestions?: string[];
}

export interface AIMetadata {
    model: string;
    tokens: number;
    timestamp: number;
    duration?: number;
    temperature?: number;
    systemPrompt?: string;
}

export interface MessageValidationResponse {
    isValid: boolean;
    score: number;
    details: ValidationDetails;
    suggestions?: string[];
}

export interface ValidationDetails {
    wordCount: {
        valid: boolean;
        actual: number;
        min?: number;
        max?: number;
    };
    spamCheck: {
        valid: boolean;
        indicators?: string[];
    };
    personalizationCheck: {
        valid: boolean;
        hasPersonalization: boolean;
        score?: number;
    };
    toneCheck: {
        valid: boolean;
        detectedTone?: MessageTone;
        confidence?: number;
    };
    grammarCheck: {
        valid: boolean;
        errors?: GrammarError[];
    };
}

export interface GrammarError {
    type: 'spelling' | 'grammar' | 'punctuation' | 'style';
    message: string;
    position?: {
        line: number;
        column: number;
    };
    suggestion?: string;
}

export interface ServiceStatusResponse {
    isAvailable: boolean;
    health: number;
    model: string;
    averageResponseTime?: number;
    rateLimit?: {
        requestsPerMinute: number;
        remaining: number;
        resetAt: number;
    };
    error?: string;
}

export class AIOutreachAPIClient implements AIOutreachService {
    private baseUrl: string;
    private apiKey: string;
    private timeout: number;
    private maxRetries: number;

    constructor(config: AIOutreachConfig) {
        this.baseUrl = config.baseUrl;
        this.apiKey = config.apiKey;
        this.timeout = config.timeout || 30000;
        this.maxRetries = config.maxRetries || 3;
    }

    async generateMessage(request: AIMessageRequest): Promise<AIMessageResponse> {
        return this.retryWithBackoff(
            () => this._generateMessage(request),
            this.maxRetries
        );
    }

    async generateBatchMessages(
        requests: AIMessageRequest[]
    ): Promise<AIMessageResponse[]> {
        const concurrency = 5;

        const results = await Promise.all(
            requests.map(request => this.generateMessage(request))
        );

        return results;
    }

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
                error: (error as Error).message
            };
        }
    }

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

    private async retryWithBackoff<T>(
        fn: () => Promise<T>,
        maxRetries: number
    ): Promise<T> {
        for (let attempt = 0; attempt < maxRetries; attempt++) {
            try {
                return await fn();
            } catch (error) {
                if (attempt === maxRetries - 1) {
                    throw error;
                }

                const delay = Math.pow(2, attempt) * 1000;
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
        throw new Error('Max retries exceeded');
    }

    private handleError(error: any): any {
        if (error.name === 'AbortError' || error.message?.includes('timeout')) {
            return {
                success: false,
                error: 'Request timeout',
                errorCode: 'TIMEOUT'
            };
        }

        if (error.message?.includes('rate limit')) {
            return {
                success: false,
                error: error.message,
                errorCode: 'RATE_LIMIT_EXCEEDED'
            };
        }

        if (error.message?.includes('auth')) {
            return {
                success: false,
                error: error.message,
                errorCode: 'AUTHENTICATION_ERROR'
            };
        }

        return {
            success: false,
            error: error.message || 'Unknown error',
            errorCode: 'GENERATION_FAILED'
        };
    }

    private sleep(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

export interface AIOutreachConfig {
    baseUrl: string;
    apiKey: string;
    timeout?: number;
    maxRetries?: number;
}
