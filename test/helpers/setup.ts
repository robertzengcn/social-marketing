/**
 * Mocha global setup file
 * Configures test environment for all Mocha tests
 */

import { DatabaseTestHelper } from './database-helper';

/**
 * Setup: Run once before all tests
 */
before(async function() {
    console.log('Setting up Mocha test environment...');
    DatabaseTestHelper.initializeTestDir();
});

/**
 * Teardown: Run once after all tests
 */
after(async function() {
    console.log('Cleaning up Mocha test environment...');
    await DatabaseTestHelper.cleanupAllDatabases();
});

/**
 * Setup: Run before each test
 */
beforeEach(async function() {
    // Individual test setup if needed
});

/**
 * Teardown: Run after each test
 */
afterEach(async function() {
    // Individual test cleanup if needed
});
