import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';
import { ArticleModel } from '@/model/Article.model';
import { VideoDownloadTaskModel } from '@/model/VideoDownloadTask.model';
import { TaskResultModel } from '@/model/TaskResult.model'; 
import { ScheduleTaskModule } from '@/modules/ScheduleTaskModule';
import { TaskType } from '@/entity/ScheduleTask.entity';
import { VideoDownloadTaskEntity } from '@/entity/VideoDownloadTask.entity';

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
      const articleModel = new ArticleModel(':memory:');
      const articleId = await articleModel.saveArticle({
        title: 'Test Article',
        originalContent: 'Test content',
        sourceUrl: 'http://test.com',
        contentHash: 'test-hash',
        sourceLanguage: 'en',
      });
      expect(articleId).toBeGreaterThan(0);

      // Read
      const found = await articleModel.getArticleById(articleId);
      expect(found).not.toBeNull();
      expect(found?.title).toBe('Test Article');

      // Update
      await articleModel.saveArticle({
        id: articleId,
        title: 'Updated Title',
        originalContent: 'Test content',
        sourceUrl: 'http://test.com',
        contentHash: 'test-hash',
      });
      const updated = await articleModel.getArticleById(articleId);
      expect(updated?.title).toBe('Updated Title');

      // Delete
      await articleModel.deleteArticle(articleId);
      const deleted = await articleModel.getArticleById(articleId);
      expect(deleted).toBeNull();
    });
  });

  describe('VideoDownloadTask Entity', () => {
    let taskId: number;
    test('Create, Read, Update, Delete', async () => {
      // Create
      const videoDownloadTaskModel = new VideoDownloadTaskModel(':memory:');
      const task = new VideoDownloadTaskEntity();
      task.task_name = 'Test Video';
      task.platform = 'youtube';
      task.savepath = '/tmp';
      task.status = 0;
      const taskId = await videoDownloadTaskModel.saveVideoDownloadTask(task);
      expect(taskId).toBeGreaterThan(0);

      // Read
      const found = await videoDownloadTaskModel.getVideoDownloadTask(taskId);
      expect(found).not.toBeNull();
      expect(found?.task_name).toBe('Test Video');

      // Update
      await videoDownloadTaskModel.updateVideoDownloadTaskStatus(taskId, 1);
      const updated = await videoDownloadTaskModel.getVideoDownloadTask(taskId);
      expect(updated?.status).toBe(1);

      // Note: No delete method available in VideoDownloadTaskModel
      // The model doesn't provide a delete method
    });
  });

  describe('TaskResult Entity', () => {
    let resultId: number;
    test('Create, Read, Update, Delete', async () => {
      // Create
      const taskResultModel = new TaskResultModel(':memory:');
      const resultId = await taskResultModel.saveTaskresult({
        taskrun_id: 1,
        url: 'http://test.com',
        title: 'Test Result',
        content: 'success',
        lang: 'en',
      });
      expect(resultId).toBeGreaterThan(0);

      // Read
      const found = await taskResultModel.getTaskresultlist(1, 0, 10);
      expect(found.Records.length).toBeGreaterThan(0);
      expect(found.Records[0].content).toBe('success');

      // Delete
      await taskResultModel.deleteTaskResults(1);
      const deleted = await taskResultModel.getTaskresultlist(1, 0, 10);
      expect(deleted.Records.length).toBe(0);
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
        task_type: TaskType.SEARCH,
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