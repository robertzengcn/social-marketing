/**
 * Unit tests for OutreachController
 * Tests controller layer for outreach operations (thin wrapper over modules)
 */

'use strict';

import { expect } from 'chai'
import { describe, it, beforeEach } from 'mocha'

// Mock OutreachModule
const mockOutreachModule = {
    createScrapingTask: () => Promise.resolve(1),
    startScrapingTask: () => Promise.resolve(),
    getScrapingTaskStatus: () => Promise.resolve({ id: 1, status: 'running' }),
    getAllScrapingTasks: () => Promise.resolve([]),
    getContactsByTask: () => Promise.resolve([]),
    deleteContact: () => Promise.resolve(),
    updateContactStatus: () => Promise.resolve(),
    generateMessageForContact: () => Promise.resolve(),
    updateMessageContent: () => Promise.resolve(),
    reviewMessage: () => Promise.resolve(),
    createCampaign: () => Promise.resolve(1),
    sendCampaign: () => Promise.resolve(),
    getCampaignStatus: () => Promise.resolve({ id: 1, status: 'pending' }),
    getAllCampaigns: () => Promise.resolve([]),
    getCampaignStats: () => Promise.resolve({ sent: 0, failed: 0, pending: 5 })
}

describe('OutreachController', () => {
    let controller: any

    beforeEach(() => {
        // Import controller after mocks are set up
        const OutreachController = require('@/controller/OutreachController').OutreachController
        controller = new OutreachController()
        controller['module'] = mockOutreachModule
    })

    describe('Scraping Task Management', () => {
        it('should create scraping task', async () => {
            const result = await controller.createScrapingTask('Test Task', 'Description', ['https://example.com'])

            expect(result).to.equal(1)
            expect(mockOutreachModule.createScrapingTask).toHaveBeenCalledWith('Test Task', 'Description', ['https://example.com'])
        })

        it('should start scraping task', async () => {
            await controller.startScrapingTask(1)

            expect(mockOutreachModule.startScrapingTask).toHaveBeenCalledWith(1)
        })

        it('should get scraping task status', async () => {
            const mockStatus = { id: 1, status: 'running' }
            mockOutreachModule.getScrapingTaskStatus.mockResolvedValue(mockStatus)

            const status = await controller.getScrapingTaskStatus(1)

            expect(status).to.deep.equal(mockStatus)
        })

        it('should get all scraping tasks', async () => {
            mockOutreachModule.getAllScrapingTasks.mockResolvedValue([])

            const tasks = await controller.getAllScrapingTasks()

            expect(tasks).to.be.an('array').that.is.empty
        })
    })

    describe('Contact Management', () => {
        it('should get contacts by task', async () => {
            const mockContacts = [{ id: 1, email: 'test@example.com' }]
            mockOutreachModule.getContactsByTask.mockResolvedValue(mockContacts)

            const contacts = await controller.getContactsByTask(1)

            expect(contacts).to.deep.equal(mockContacts)
        })

        it('should delete contact', async () => {
            await controller.deleteContact(1)

            expect(mockOutreachModule.deleteContact).toHaveBeenCalledWith(1)
        })

        it('should update contact status', async () => {
            await controller.updateContactStatus(1, 1)

            expect(mockOutreachModule.updateContactStatus).toHaveBeenCalledWith(1, 1)
        })
    })

    describe('Message Generation', () => {
        it('should generate message for contact', async () => {
            mockOutreachModule.generateMessageForContact.mockResolvedValue({})

            await controller.generateMessageForContact(1, 'Test message', null)

            expect(mockOutreachModule.generateMessageForContact).toHaveBeenCalledWith(1, 'Test message', null)
        })

        it('should update message content', async () => {
            await controller.updateMessageContent(1, 'Updated message')

            expect(mockOutreachModule.updateMessageContent).toHaveBeenCalledWith(1, 'Updated message')
        })

        it('should review message', async () => {
            await controller.reviewMessage(1)

            expect(mockOutreachModule.reviewMessage).toHaveBeenCalledWith(1)
        })
    })

    describe('Campaign Management', () => {
        it('should create campaign', async () => {
            mockOutreachModule.createCampaign.mockResolvedValue(1)

            const campaign = await controller.createCampaign('Test Campaign', [1, 2, 3])

            expect(campaign).to.have.property('id')
            expect(campaign.id).to.equal(1)
            expect(mockOutreachModule.createCampaign).toHaveBeenCalledWith('Test Campaign', [1, 2, 3])
        })

        it('should send campaign', async () => {
            await controller.sendCampaign(1)

            expect(mockOutreachModule.sendCampaign).toHaveBeenCalledWith(1)
        })

        it('should get campaign status', async () => {
            const mockStatus = { id: 1, status: 'sending', totalContacts: 10, sentCount: 5, failedCount: 2 }
            mockOutreachModule.getCampaignStatus.mockResolvedValue(mockStatus)

            const status = await controller.getCampaignStatus(1)

            expect(status).to.deep.equal(mockStatus)
        })

        it('should get all campaigns', async () => {
            mockOutreachModule.getAllCampaigns.mockResolvedValue([])

            const campaigns = await controller.getAllCampaigns()

            expect(campaigns).to.be.an('array').that.is.empty
        })

        it('should get campaign stats', async () => {
            const mockStats = { sent: 10, failed: 2, pending: 5 }
            mockOutreachModule.getCampaignStats.mockResolvedValue(mockStats)

            const stats = await controller.getCampaignStats(1)

            expect(stats).to.deep.equal(mockStats)
        })
    })
})
