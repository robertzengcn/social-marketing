import { DataSource } from "typeorm";
import { join } from "path";
import { mkdtempSync, rmSync, existsSync, unlinkSync } from "fs";
import { tmpdir } from "os";

/**
 * Database test helper for managing in-memory SQLite databases in tests
 * Provides automatic cleanup and temp directory management
 */
export class DatabaseTestHelper {
    private static testConnections: Map<string, DataSource> = new Map();
    private static testDir: string;
    private static initialized: boolean = false;

    /**
     * Initialize test environment
     * Creates temp directory for test databases
     */
    static initializeTestDir() {
        if (!this.initialized) {
            this.testDir = mkdtempSync(join(tmpdir(), 'social-marketing-test-'));
            this.initialized = true;
            console.log(`Test database directory: ${this.testDir}`);
        }
    }

    /**
     * Create an in-memory SQLite database with the given entities
     * @param entities - Array of TypeORM entity classes
     * @returns Promise<DataSource> - Initialized data source
     */
    static async createInMemoryDatabase(entities: any[]): Promise<DataSource> {
        this.initializeTestDir();

        const testDbName = `test-${Date.now()}-${Math.random().toString(36).substring(7)}.db`;
        const testDbPath = join(this.testDir, testDbName);

        const dataSource = new DataSource({
            type: "better-sqlite3",
            database: testDbPath,
            entities: entities,
            synchronize: true,
            logging: false,
        });

        await dataSource.initialize();
        this.testConnections.set(testDbPath, dataSource);

        console.log(`Created test database: ${testDbPath} with ${entities.length} entities`);
        return dataSource;
    }

    /**
     * Cleanup a specific database connection
     * @param dataSource - DataSource to cleanup
     */
    static async cleanupDatabase(dataSource: DataSource): Promise<void> {
        if (dataSource && dataSource.isInitialized) {
            await dataSource.destroy();
        }
    }

    /**
     * Cleanup all test databases and temp directory
     * Should be called in afterAll or after each test depending on needs
     */
    static async cleanupAllDatabases(): Promise<void> {
        // Destroy all connections
        for (const [dbPath, connection] of this.testConnections) {
            if (connection.isInitialized) {
                await connection.destroy();
                console.log(`Destroyed test database: ${dbPath}`);
            }
        }
        this.testConnections.clear();

        // Clean up temp directory
        if (this.initialized && existsSync(this.testDir)) {
            rmSync(this.testDir, { recursive: true, force: true });
            console.log(`Cleaned up test directory: ${this.testDir}`);
            this.initialized = false;
        }
    }

    /**
     * Get the test directory path (useful for debugging)
     */
    static getTestDir(): string {
        return this.testDir;
    }

    /**
     * Get count of active database connections
     */
    static getConnectionCount(): number {
        return this.testConnections.size;
    }
}
