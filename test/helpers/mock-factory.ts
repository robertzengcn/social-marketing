/**
 * Mock factory for creating reusable mock objects in tests
 * Provides mocks for Puppeteer, HTTP clients, LLM services, and email services
 */

/**
 * Create a mock Puppeteer Browser object
 */
export function mockBrowser(): any {
    return {
        close: jest.fn(),
        newPage: jest.fn(),
        pages: jest.fn(() => Promise.resolve([])),
        on: jest.fn(),
        removeAllListeners: jest.fn(),
        wsEndpoint: jest.fn(() => 'ws://mockendpoint'),
        isConnected: jest.fn(() => true),
    };
}

/**
 * Create a mock Puppeteer Page object
 */
export function mockPage(): any {
    return {
        goto: jest.fn(),
        evaluate: jest.fn(),
        screenshot: jest.fn(),
        waitForSelector: jest.fn(),
        waitForNavigation: jest.fn(),
        click: jest.fn(),
        type: jest.fn(),
        close: jest.fn(),
        content: jest.fn(() => Promise.resolve('<html><body>Mock content</body></html>')),
        url: jest.fn(() => 'https://example.com'),
        title: jest.fn(() => 'Mock Page'),
        waitFor: jest.fn(),
        $: jest.fn(() => null),
        $$: jest.fn(() => []),
        evaluateHandle: jest.fn(),
        waitForFunction: jest.fn(),
    };
}

/**
 * Create a mock HTTP client (fetch or axios style)
 */
export function mockHttpClient(): any {
    return {
        get: jest.fn(),
        post: jest.fn(),
        put: jest.fn(),
        delete: jest.fn(),
        patch: jest.fn(),
    };
}

/**
 * Create a mock LLM service (OpenAI, DeepSeek, Ollama)
 */
export function mockLLMService(): any {
    return {
        generate: jest.fn(),
        translate: jest.fn(),
        chat: jest.fn(),
        complete: jest.fn(),
    };
}

/**
 * Create a mock email service
 */
export function mockEmailService(): any {
    return {
        sendEmail: jest.fn(),
        getEmails: jest.fn(),
        deleteEmail: jest.fn(),
        getEmailTemplate: jest.fn(),
        sendBulk: jest.fn(),
    };
}

/**
 * Create a mock video download service
 */
export function mockVideoDownloadService(): any {
    return {
        downloadVideo: jest.fn(),
        getVideoInfo: jest.fn(),
        getProgress: jest.fn(() => ({ percent: 0, speed: 0 })),
        cancel: jest.fn(),
    };
}

/**
 * Create a mock scraping service
 */
export function mockScrapingService(): any {
    return {
        scrape: jest.fn(),
        scrapeMultiple: jest.fn(),
        getProgress: jest.fn(() => ({ pages: 0, contacts: 0 })),
        stop: jest.fn(),
    };
}

/**
 * Create a mock ProcessMessage for child process communication
 */
export function mockProcessMessage(): any {
    return {
        action: '',
        data: null,
        success: true,
        error: null,
    };
}

/**
 * Create a mock file system object
 */
export function mockFileSystem(): any {
    return {
        existsSync: jest.fn(() => true),
        readFileSync: jest.fn(() => 'mock file content'),
        writeFileSync: jest.fn(),
        unlinkSync: jest.fn(),
        mkdirSync: jest.fn(),
        rmSync: jest.fn(),
        mkdtempSync: jest.fn(() => '/tmp/mock-dir'),
    };
}

/**
 * Create a mock Token service
 */
export function mockTokenService(): any {
    return {
        setValue: jest.fn(),
        getValue: jest.fn((key: string) => {
            // Mock common token values
            if (key === 'user:dbpath') return '/tmp/test.db';
            if (key === 'proxy:config') return '[]';
            return null;
        }),
        deleteValue: jest.fn(),
    };
}

/**
 * Create a mock schedule task entity
 */
export function mockScheduleTask(overrides: any = {}): any {
    return {
        id: 1,
        name: 'Test Schedule',
        task_type: 'search',
        task_id: 1,
        trigger_type: 'cron',
        cron_expression: '0 0 * * *',
        is_active: true,
        status: 'pending',
        next_run_time: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
        ...overrides,
    };
}

/**
 * Create a mock search task entity
 */
export function mockSearchTask(overrides: any = {}): any {
    return {
        id: 1,
        keyword: 'test keyword',
        url: 'https://example.com',
        platform: 'google',
        status: 'pending',
        result_count: 0,
        created_at: new Date(),
        updated_at: new Date(),
        ...overrides,
    };
}

/**
 * Create a mock email marketing task entity
 */
export function mockEmailMarketingTask(overrides: any = {}): any {
    return {
        id: 1,
        name: 'Test Email Campaign',
        template_id: 1,
        filter_id: 1,
        status: 'pending',
        sent_count: 0,
        created_at: new Date(),
        updated_at: new Date(),
        ...overrides,
    };
}

/**
 * Create a mock video download task entity
 */
export function mockVideoDownloadTask(overrides: any = {}): any {
    return {
        id: 1,
        url: 'https://youtube.com/watch?v=test',
        platform: 'youtube',
        status: 'pending',
        progress: 0,
        save_path: '/tmp/videos/',
        created_at: new Date(),
        updated_at: new Date(),
        ...overrides,
    };
}

/**
 * Create a mock outreach task entity
 */
export function mockOutreachTask(overrides: any = {}): any {
    return {
        id: 1,
        name: 'Test Scraping Task',
        target_urls: ['https://example.com'],
        options: '{}',
        status: 'pending',
        contacts_found: 0,
        created_at: new Date(),
        updated_at: new Date(),
        ...overrides,
    };
}

/**
 * Create a mock contact entity
 */
export function mockContact(overrides: any = {}): any {
    return {
        id: 1,
        email: 'test@example.com',
        name: 'Test Contact',
        website: 'https://example.com',
        source_url: 'https://example.com',
        status: 0, // Pending
        created_at: new Date(),
        updated_at: new Date(),
        ...overrides,
    };
}

/**
 * Create a mock outreach message entity
 */
export function mockOutreachMessage(overrides: any = {}): any {
    return {
        id: 1,
        contact_id: 1,
        campaign_id: 1,
        content: 'Test message content',
        status: 'generated', // Generated, reviewed, sent, failed
        ai_generated: true,
        quality_score: 0.8,
        created_at: new Date(),
        updated_at: new Date(),
        ...overrides,
    };
}

/**
 * Create a mock outreach campaign entity
 */
export function mockOutreachCampaign(overrides: any = {}): any {
    return {
        id: 1,
        name: 'Test Campaign',
        status: 'pending', // Pending, sending, completed, failed
        total_contacts: 0,
        sent_count: 0,
        failed_count: 0,
        created_at: new Date(),
        updated_at: new Date(),
        ...overrides,
    };
}

/**
 * Mock Vitest vi object for tests that don't import it
 * Note: Prefer importing { vi } from 'vitest' when possible
 */
export const vi = {
    fn: (() => {
        const fn = (...args: any[]) => {};
        fn.mockImplementation = (impl: Function) => impl;
        fn.mockResolvedValue = (val: any) => val;
        fn.mockRejectedValue = (val: any) => { throw val; };
        fn.mockReturnValue = (val: any) => val;
        return fn;
    }) as any,
    clearAllMocks: jest.fn(),
    restoreAllMocks: jest.fn(),
    mock: jest.fn(),
    spyOn: jest.fn(),
};

/**
 * Re-export for compatibility with Vitest
 * In actual tests, use: import { vi } from 'vitest'
 */
export { vi as vitestVi };
