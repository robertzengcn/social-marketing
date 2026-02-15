/**
 * Unit tests for core database models
 * Tests CRUD operations, queries, and data integrity for key models
 */

import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest'
import { DatabaseTestHelper } from '@/test/helpers/database-helper'
import { TEST_ENTITIES } from '@/test/helpers/test-entities'
import { SearchResultModel } from '@/model/searchResultdb'
import { ScheduleTaskModel } from '@/model/ScheduleTask.model'
import { OutreachModel } from '@/model/outreach.model'

describe('Database Models', () => {
    describe('SearchResultModel', () => {
        let model: SearchResultModel
        let dataSource: any

        beforeEach(async () => {
            dataSource = await DatabaseTestHelper.createInMemoryDatabase(TEST_ENTITIES)
            model = new SearchResultModel(dataSource)
        })

        afterEach(async () => {
            await DatabaseTestHelper.cleanupAllDatabases()
        })

        test('should create search result', async () => {
            const result = await model.create({
                url: 'https://example.com',
                title: 'Example Site',
                snippet: 'A test website',
                task_id: 1
            })

            expect(result).toHaveProperty('id')
            expect(result.url).toBe('https://example.com')
        })

        test('should read search result by ID', async () => {
            const created = await model.create({
                url: 'https://example.com',
                task_id: 1
            })

            const read = await model.read(created.id)

            expect(read).not.toBeNull()
            expect(read?.url).toBe('https://example.com')
        })

        test('should update search result', async () => {
            const created = await model.create({
                url: 'https://example.com',
                task_id: 1
            })

            await model.update(created.id, { title: 'Updated Title' })

            const updated = await model.read(created.id)
            expect(updated?.title).toBe('Updated Title')
        })

        test('should delete search result', async () => {
            const created = await model.create({
                url: 'https://example.com',
                task_id: 1
            })

            await model.delete(created.id)

            const deleted = await model.read(created.id)
            expect(deleted).toBeNull()
        })

        test('should query results by task ID', async () => {
            await model.create({ url: 'https://example1.com', task_id: 1 })
            await model.create({ url: 'https://example2.com', task_id: 1 })
            await model.create({ url: 'https://example3.com', task_id: 2 })

            const results = await model.findByTaskId(1)

            expect(results).toHaveLength(2)
            expect(results[0].task_id).toBe(1)
        })
    })

    describe('ScheduleTaskModel', () => {
        let model: ScheduleTaskModel
        let dataSource: any

        beforeEach(async () => {
            dataSource = await DatabaseTestHelper.createInMemoryDatabase(TEST_ENTITIES)
            model = new ScheduleTaskModel(dataSource)
        })

        afterEach(async () => {
            await DatabaseTestHelper.cleanupAllDatabases()
        })

        test('should create schedule with cron expression', async () => {
            const schedule = await model.create({
                name: 'Test Schedule',
                cron_expression: '0 0 * * *',
                task_type: 'search',
                task_id: 1,
                is_active: true
            })

            expect(schedule).toHaveProperty('id')
            expect(schedule.name).toBe('Test Schedule')
            expect(schedule.cron_expression).toBe('0 0 * * *')
        })

        test('should update schedule status', async () => {
            const created = await model.create({
                name: 'Test Schedule',
                cron_expression: '0 0 * * *',
                task_type: 'search',
                task_id: 1
            })

            await model.update(created.id, { status: 'running' })

            const updated = await model.read(created.id)
            expect(updated?.status).toBe('running')
        })

        test('should get active schedules', async () => {
            await model.create({ name: 'Active Schedule', cron_expression: '0 0 * * *', is_active: true })
            await model.create({ name: 'Inactive Schedule', cron_expression: '0 0 * * *', is_active: false })

            const activeSchedules = await model.getActiveSchedules()

            expect(activeSchedules).toHaveLength(1)
            expect(activeSchedules[0].name).toBe('Active Schedule')
        })
    })

    describe('OutreachModel', () => {
        let model: OutreachModel
        let dataSource: any

        beforeEach(async () => {
            dataSource = await DatabaseTestHelper.createInMemoryDatabase(TEST_ENTITIES)
            model = new OutreachModel(dataSource)
        })

        afterEach(async () => {
            await DatabaseTestHelper.cleanupAllDatabases()
        })

        test('should create outreach task', async () => {
            const task = await model.createTask({
                name: 'Scraping Task',
                target_urls: JSON.stringify(['https://example.com']),
                status: 0
            })

            expect(task).toHaveProperty('id')
            expect(task.name).toBe('Scraping Task')
        })

        test('should create contact', async () => {
            const contact = await model.createContact({
                task_id: 1,
                email: 'contact@example.com',
                name: 'Test Contact',
                website: 'https://example.com',
                source_url: 'https://example.com'
            })

            expect(contact).toHaveProperty('id')
            expect(contact.email).toBe('contact@example.com')
        })

        test('should create outreach message', async () => {
            const message = await model.createMessage({
                content: 'Test message',
                contact_id: 1,
                ai_generated: true,
                user_edited: false,
                reviewed: false
            })

            expect(message).toHaveProperty('id')
            expect(message.content).toBe('Test message')
        })

        test('should create outreach campaign', async () => {
            const campaign = await model.createCampaign({
                name: 'Test Campaign',
                status: 0,
                total_contacts: 10,
                sent_count: 0,
                failed_count: 0
            })

            expect(campaign).toHaveProperty('id')
            expect(campaign.name).toBe('Test Campaign')
        })

        test('should get campaign statistics', async () => {
            const campaign = await model.createCampaign({ name: 'Test', total_contacts: 5, sent_count: 3, failed_count: 1 })
            await model.createContact({ task_id: 1, email: 'c1@example.com', status: 2, campaign_id: campaign.id })
            await model.createContact({ task_id: 1, email: 'c2@example.com', status: 2, campaign_id: campaign.id })
            await model.createContact({ task_id: 1, email: 'c3@example.com', status: 1, campaign_id: campaign.id })

            const stats = await model.getCampaignStats(campaign.id)

            expect(stats.total_contacts).toBe(5)
            expect(stats.sent_count).toBeGreaterThan(0)
        })
    })
})
