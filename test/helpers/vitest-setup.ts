/**
 * Vitest setup file
 * Configures test environment for all Vitest tests
 * Import this in test files: import '@/test/helpers/vitest-setup'
 */

import { beforeEach, afterEach, vi } from 'vitest';
import { DatabaseTestHelper } from './database-helper';

/**
 * Setup: Run before each test
 */
beforeEach(async () => {
    // Clear all mocks before each test
    vi.clearAllMocks();
});

/**
 * Teardown: Run after each test
 */
afterEach(async () => {
    // Clean up all databases after each test
    await DatabaseTestHelper.cleanupAllDatabases();
});

/**
 * Global setup (run once before all tests)
 */
// Note: Vitest doesn't have before/after hooks, use setupFiles in vitest config instead
console.log('Vitest test environment configured');
