/**
 * Mock factory for creating reusable mock objects in tests
 * Provides mocks for Puppeteer, HTTP clients, LLM services, and email services
 */

/**
 * Helper function to create a mock function
 * Compatible with Vitest and Mocha testing frameworks
 */
function createMockFn(implementation?: Function | any): any {
    const fn = (...args: any[]) => {
        if (typeof implementation === 'function') {
            return implementation(...args);
        }
        return implementation;
    };
    fn.mockImplementation = (impl: Function) => { implementation = impl; return fn; };
    fn.mockResolvedValue = (val: any) => { implementation = () => Promise.resolve(val); return fn; };
    fn.mockRejectedValue = (val: any) => { implementation = () => Promise.reject(val); return fn; };
    fn.mockReturnValue = (val: any) => { implementation = () => val; return fn; };
    fn.mockClear = () => {};
    fn.mockReset = () => {};
    return fn;
}

/**
 * Create a mock Puppeteer Browser object
 */
export function mockBrowser(): any {
    return {
        close: createMockFn(),
        newPage: createMockFn(),
        pages: createMockFn(() => Promise.resolve([])),
        on: createMockFn(),
        removeAllListeners: createMockFn(),
        wsEndpoint: createMockFn(() => 'ws://mockendpoint'),
        isConnected: createMockFn(() => true),
    };
}

/**
 * Create a mock Puppeteer Page object
 */
export function mockPage(): any {
    return {
        goto: createMockFn(),
        evaluate: createMockFn(),
        screenshot: createMockFn(),
        waitForSelector: createMockFn(),
        waitForNavigation: createMockFn(),
        click: createMockFn(),
        type: createMockFn(),
        close: createMockFn(),
        content: createMockFn(() => Promise.resolve('<html><body>Mock content</body></html>')),
        url: createMockFn(() => 'https://example.com'),
        title: createMockFn(() => 'Mock Page'),
        waitFor: createMockFn(),
        $: createMockFn(() => null),
        $$: createMockFn(() => []),
        evaluateHandle: createMockFn(),
        waitForFunction: createMockFn(),
    };
}

/**
 * Create a mock HTTP client (fetch or axios style)
 */
export function mockHttpClient(): any {
    return {
        get: createMockFn(),
        post: createMockFn(),
        put: createMockFn(),
        delete: createMockFn(),
        patch: createMockFn(),
    };
}

/**
 * Create a mock LLM service (OpenAI, DeepSeek, Ollama)
 */
export function mockLLMService(): any {
    return {
        generate: createMockFn(),
        translate: createMockFn(),
        chat: createMockFn(),
        complete: createMockFn(),
    };
}

/**
 * Create a mock email service
 */
export function mockEmailService(): any {
    return {
        sendEmail: createMockFn(),
        getEmails: createMockFn(),
        deleteEmail: createMockFn(),
        getEmailTemplate: createMockFn(),
        sendBulk: createMockFn(),
    };
}

/**
 * Create a mock video download service
 */
export function mockVideoDownloadService(): any {
    return {
        downloadVideo: createMockFn(),
        getVideoInfo: createMockFn(),
        getProgress: createMockFn(() => ({ percent: 0, speed: 0 })),
        cancel: createMockFn(),
    };
}

/**
 * Create a mock scraping service
 */
export function mockScrapingService(): any {
    return {
        scrape: createMockFn(),
        scrapeMultiple: createMockFn(),
        getProgress: createMockFn(() => ({ pages: 0, contacts: 0 })),
        stop: createMockFn(),
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
        existsSync: createMockFn(() => true),
        readFileSync: createMockFn(() => 'mock file content'),
        writeFileSync: createMockFn(),
        unlinkSync: createMockFn(),
        mkdirSync: createMockFn(),
        rmSync: createMockFn(),
        mkdtempSync: createMockFn(() => '/tmp/mock-dir'),
    };
}

/**
 * Create a mock Token service
 */
export function mockTokenService(): any {
    return {
        setValue: createMockFn(),
        getValue: createMockFn((key: string) => {
            // Mock common token values
            if (key === 'user:dbpath') return '/tmp/test.db';
            if (key === 'proxy:config') return '[]';
            return null;
        }),
        deleteValue: createMockFn(),
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
    fn: createMockFn,
    clearAllMocks: createMockFn(),
    restoreAllMocks: createMockFn(),
    mock: createMockFn(),
    spyOn: createMockFn(),
};

/**
 * Re-export for compatibility with Vitest
 * In actual tests, use: import { vi } from 'vitest'
 */
export { vi as vitestVi };
