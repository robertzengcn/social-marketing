/**
 * Unit tests for ScheduleController
 * Tests the controller layer for schedule management (thin wrapper over modules)
 */

'use strict';

import { expect } from 'chai'
import { describe, it, beforeEach } from 'mocha'
import * as sinon from 'sinon'

describe('ScheduleController', () => {
    let controller: any
    let mockScheduleTaskModule: any

    beforeEach(() => {
        // Create Sinon spies for mocking
        mockScheduleTaskModule = {
            createSchedule: sinon.stub().resolves(1),
            updateSchedule: sinon.stub().resolves(),
            deleteSchedule: sinon.stub().resolves(),
            getScheduleById: sinon.stub().resolves({ id: 1, name: 'Test Schedule' }),
            listSchedules: sinon.stub().resolves({ records: [], total: 0 }),
            enableSchedule: sinon.stub().resolves(),
            disableSchedule: sinon.stub().resolves(),
            pauseSchedule: sinon.stub().resolves(),
            resumeSchedule: sinon.stub().resolves(),
            validateSchedule: sinon.stub().resolves({ isValid: true, errors: [] })
        }

        // Import controller after mocks are set up
        const ScheduleController = require('@/controller/ScheduleController').ScheduleController
        controller = new ScheduleController()
        controller['scheduleTaskModule'] = mockScheduleTaskModule
    })

    describe('Schedule CRUD', () => {
        it('should create a new schedule', async () => {
            const scheduleData = {
                name: 'Test Schedule',
                cron_expression: '0 0 * * *',
                is_active: true,
                trigger_type: 'cron'
            }

            const id = await controller.createSchedule(scheduleData)

            expect(id).to.be.a('number')
            sinon.assert.calledWith(mockScheduleTaskModule.createSchedule, scheduleData)
        })

        it('should update existing schedule', async () => {
            const updateData = {
                name: 'Updated Schedule'
            }

            await controller.updateSchedule(1, updateData)

            sinon.assert.calledWith(mockScheduleTaskModule.updateSchedule, 1, updateData)
        })

        it('should delete a schedule', async () => {
            await controller.deleteSchedule(1)

            sinon.assert.calledWith(mockScheduleTaskModule.deleteSchedule, 1)
        })

        it('should get schedule by ID', async () => {
            const schedule = await controller.getSchedule(1)

            expect(schedule).to.deep.equal({ id: 1, name: 'Test Schedule' })
            sinon.assert.calledWith(mockScheduleTaskModule.getScheduleById, 1)
        })
    })

    describe('Schedule List', () => {
        it('should list schedules with pagination', async () => {
            const result = await controller.listSchedules(0, 10)

            expect(result).to.have.property('schedules')
            expect(result).to.have.property('total')
            sinon.assert.calledWith(mockScheduleTaskModule.listSchedules, 0, 10)
        })

        it('should handle empty list', async () => {
            mockScheduleTaskModule.listSchedules = sinon.stub().resolves({
                records: [],
                total: 0
            })

            const result = await controller.listSchedules(0, 10)

            expect(result.schedules).to.have.length(0)
            expect(result.total).to.equal(0)
        })
    })

    describe('Schedule Status Toggle', () => {
        it('should enable a schedule', async () => {
            await controller.enableSchedule(1)

            sinon.assert.calledWith(mockScheduleTaskModule.enableSchedule, 1)
        })

        it('should disable a schedule', async () => {
            await controller.disableSchedule(1)

            sinon.assert.calledWith(mockScheduleTaskModule.disableSchedule, 1)
        })

        it('should pause a schedule', async () => {
            await controller.pauseSchedule(1)

            sinon.assert.calledWith(mockScheduleTaskModule.pauseSchedule, 1)
        })

        it('should resume a schedule', async () => {
            await controller.resumeSchedule(1)

            sinon.assert.calledWith(mockScheduleTaskModule.resumeSchedule, 1)
        })
    })

    describe('Schedule Validation', () => {
        it('should validate schedule data', async () => {
            const scheduleData = {
                name: 'Test Schedule',
                cron_expression: '0 0 * * *',
                is_active: true,
                trigger_type: 'cron'
            }

            const result = await controller.validateSchedule(scheduleData)

            expect(result.isValid).to.be.true
            expect(result.errors).to.have.length(0)
            sinon.assert.calledWith(mockScheduleTaskModule.validateSchedule, scheduleData)
        })

        it('should return validation errors for invalid cron', async () => {
            const scheduleData = {
                name: 'Invalid Schedule',
                cron_expression: 'invalid-cron',
                is_active: true,
                trigger_type: 'cron'
            }

            // Mock validation to return error
            mockScheduleTaskModule.validateSchedule = sinon.stub().resolves({
                isValid: false,
                errors: ['Invalid cron expression']
            })

            const result = await controller.validateSchedule(scheduleData)

            expect(result.isValid).to.be.false
            expect(result.errors).to.include('Invalid cron expression')
        })
    })
})
