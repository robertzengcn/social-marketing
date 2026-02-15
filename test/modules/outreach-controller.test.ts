/**
 * Unit tests for OutreachController
 * Tests controller layer for outreach operations (thin wrapper over modules)
 */

'use strict';

import { expect } from 'chai'
import { describe, it, beforeEach } from 'mocha'
import * as sinon from 'sinon'

describe('OutreachController', () => {
    let controller: any
    let mockOutreachModule: any

    beforeEach(() => {
        // Create Sinon stubs for mocking
        mockOutreachModule = {
            createScrapingTask: sinon.stub().resolves(1),
            startScrapingTask: sinon.stub().resolves(),
            getScrapingTaskStatus: sinon.stub().resolves({ id: 1, status: 'running' }),
            getAllScrapingTasks: sinon.stub().resolves([]),
            getContactsByTask: sinon.stub().resolves([]),
            deleteContact: sinon.stub().resolves(),
            updateContactStatus: sinon.stub().resolves(),
            generateMessageForContact: sinon.stub().resolves(),
            updateMessageContent: sinon.stub().resolves(),
            reviewMessage: sinon.stub().resolves(),
            createCampaign: sinon.stub().resolves(1),
            sendCampaign: sinon.stub().resolves(),
            getCampaignStatus: sinon.stub().resolves({ id: 1, status: 'pending' }),
            getAllCampaigns: sinon.stub().resolves([]),
            getCampaignStats: sinon.stub().resolves({ sent: 0, failed: 0, pending: 5 })
        }

        // Import controller after mocks are set up
        const OutreachController = require('@/controller/OutreachController').OutreachController
        controller = new OutreachController()
        controller['module'] = mockOutreachModule
    })

    describe('Scraping Task Management', () => {
        it('should create scraping task', async () => {
            const result = await controller.createScrapingTask('Test Task', 'Description', ['https://example.com'])

            expect(result).to.equal(1)
            sinon.assert.calledWith(mockOutreachModule.createScrapingTask, 'Test Task', 'Description', ['https://example.com'])
        })

        it('should start scraping task', async () => {
            await controller.startScrapingTask(1)

            sinon.assert.calledWith(mockOutreachModule.startScrapingTask, 1)
        })

        it('should get scraping task status', async () => {
            const mockStatus = { id: 1, status: 'running' }
            mockOutreachModule.getScrapingTaskStatus.resolves(mockStatus)

            const status = await controller.getScrapingTaskStatus(1)

            expect(status).to.deep.equal(mockStatus)
        })

        it('should get all scraping tasks', async () => {
            mockOutreachModule.getAllScrapingTasks.resolves([])

            const tasks = await controller.getAllScrapingTasks()

            expect(tasks).to.be.an('array').that.is.empty
        })
    })

    describe('Contact Management', () => {
        it('should get contacts by task', async () => {
            const mockContacts = [{ id: 1, email: 'test@example.com' }]
            mockOutreachModule.getContactsByTask.resolves(mockContacts)

            const contacts = await controller.getContactsByTask(1)

            expect(contacts).to.deep.equal(mockContacts)
        })

        it('should delete contact', async () => {
            await controller.deleteContact(1)

            sinon.assert.calledWith(mockOutreachModule.deleteContact, 1)
        })

        it('should update contact status', async () => {
            await controller.updateContactStatus(1, 1)

            sinon.assert.calledWith(mockOutreachModule.updateContactStatus, 1, 1)
        })
    })

    describe('Message Generation', () => {
        it('should generate message for contact', async () => {
            mockOutreachModule.generateMessageForContact.resolves({})

            await controller.generateMessageForContact(1, 'Test message', null)

            sinon.assert.calledWith(mockOutreachModule.generateMessageForContact, 1, 'Test message', null)
        })

        it('should update message content', async () => {
            await controller.updateMessageContent(1, 'Updated message')

            sinon.assert.calledWith(mockOutreachModule.updateMessageContent, 1, 'Updated message')
        })

        it('should review message', async () => {
            await controller.reviewMessage(1)

            sinon.assert.calledWith(mockOutreachModule.reviewMessage, 1)
        })
    })

    describe('Campaign Management', () => {
        it('should create campaign', async () => {
            mockOutreachModule.createCampaign.resolves(1)

            const campaign = await controller.createCampaign('Test Campaign', [1, 2, 3])

            expect(campaign).to.have.property('id')
            expect(campaign.id).to.equal(1)
            sinon.assert.calledWith(mockOutreachModule.createCampaign, 'Test Campaign', [1, 2, 3])
        })

        it('should send campaign', async () => {
            await controller.sendCampaign(1)

            sinon.assert.calledWith(mockOutreachModule.sendCampaign, 1)
        })

        it('should get campaign status', async () => {
            const mockStatus = { id: 1, status: 'sending', totalContacts: 10, sentCount: 5, failedCount: 2 }
            mockOutreachModule.getCampaignStatus.resolves(mockStatus)

            const status = await controller.getCampaignStatus(1)

            expect(status).to.deep.equal(mockStatus)
        })

        it('should get all campaigns', async () => {
            mockOutreachModule.getAllCampaigns.resolves([])

            const campaigns = await controller.getAllCampaigns()

            expect(campaigns).to.be.an('array').that.is.empty
        })

        it('should get campaign stats', async () => {
            const mockStats = { sent: 10, failed: 2, pending: 5 }
            mockOutreachModule.getCampaignStats.resolves(mockStats)

            const stats = await controller.getCampaignStats(1)

            expect(stats).to.deep.equal(mockStats)
        })
    })
})
