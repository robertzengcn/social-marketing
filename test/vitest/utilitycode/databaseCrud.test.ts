import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';
import { Article } from '@/model/Article.model';
import { VideoDownloadTask } from '@/model/VideoDownloadTask.model';
import { TaskResult } from '@/model/TaskResult.model';
import { ScheduleTaskModule } from '@/modules/ScheduleTaskModule';

// Mock DB setup/teardown if needed (replace with real in-memory DB setup if available)
const clearDb = async () => {
  // If using in-memory DB, clear all tables here
};

describe('Database CRUD Operations', () => {
  beforeEach(async () => {
    await clearDb();
  });
  afterEach(async () => {
    await clearDb();
  });

  describe('Article Entity', () => {
    let articleId: number;
    test('Create, Read, Update, Delete', async () => {
      // Create
      const article = await Article.create({
        title: 'Test Article',
        content: 'Test content',
        author: 'Tester',
        language: 'en',
      });
      articleId = article.id;
      expect(articleId).toBeGreaterThan(0);

      // Read
      const found = await Article.findById(articleId);
      expect(found).not.toBeNull();
      expect(found?.title).toBe('Test Article');

      // Update
      await Article.update(articleId, { title: 'Updated Title' });
      const updated = await Article.findById(articleId);
      expect(updated?.title).toBe('Updated Title');

      // Delete
      await Article.delete(articleId);
      const deleted = await Article.findById(articleId);
      expect(deleted).toBeNull();
    });
  });

  describe('VideoDownloadTask Entity', () => {
    let taskId: number;
    test('Create, Read, Update, Delete', async () => {
      // Create
      const task = await VideoDownloadTask.create({
        name: 'Test Video',
        url: 'http://test.com/video.mp4',
        status: 'pending',
      });
      taskId = task.id;
      expect(taskId).toBeGreaterThan(0);

      // Read
      const found = await VideoDownloadTask.findById(taskId);
      expect(found).not.toBeNull();
      expect(found?.name).toBe('Test Video');

      // Update
      await VideoDownloadTask.update(taskId, { status: 'complete' });
      const updated = await VideoDownloadTask.findById(taskId);
      expect(updated?.status).toBe('complete');

      // Delete
      await VideoDownloadTask.delete(taskId);
      const deleted = await VideoDownloadTask.findById(taskId);
      expect(deleted).toBeNull();
    });
  });

  describe('TaskResult Entity', () => {
    let resultId: number;
    test('Create, Read, Update, Delete', async () => {
      // Create
      const result = await TaskResult.create({
        task_id: 1,
        result: 'success',
        details: 'All good',
      });
      resultId = result.id;
      expect(resultId).toBeGreaterThan(0);

      // Read
      const found = await TaskResult.findById(resultId);
      expect(found).not.toBeNull();
      expect(found?.result).toBe('success');

      // Update
      await TaskResult.update(resultId, { result: 'failed' });
      const updated = await TaskResult.findById(resultId);
      expect(updated?.result).toBe('failed');

      // Delete
      await TaskResult.delete(resultId);
      const deleted = await TaskResult.findById(resultId);
      expect(deleted).toBeNull();
    });
  });

  describe('ScheduleTaskModule', () => {
    let scheduleTaskModule: ScheduleTaskModule;
    beforeEach(() => {
      scheduleTaskModule = new ScheduleTaskModule();
    });
    test('CRUD operations for schedules', async () => {
      // Create
      const id = await scheduleTaskModule.createSchedule({
        name: 'Test Schedule',
        task_type: 1,
        task_id: 1,
        cron_expression: '0 0 * * *',
        is_active: true,
      });
      expect(id).toBeGreaterThan(0);

      // Read
      const found = await scheduleTaskModule.getScheduleById(id);
      expect(found).not.toBeNull();
      expect(found?.name).toBe('Test Schedule');

      // Update
      await scheduleTaskModule.updateSchedule(id, { name: 'Updated Schedule' });
      const updated = await scheduleTaskModule.getScheduleById(id);
      expect(updated?.name).toBe('Updated Schedule');

      // Delete
      await scheduleTaskModule.deleteSchedule(id);
      const deleted = await scheduleTaskModule.getScheduleById(id);
      expect(deleted).toBeNull();
    });
  });

  // Add more entity CRUD tests as needed for coverage
}); 