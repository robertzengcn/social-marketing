import { describe, test, expect, vi, beforeEach } from 'vitest';
import { VideoPublishStrategyFactory } from '@/strategy/VideoPublishStrategyFactory';
import { YouTubePublishStrategy } from '@/strategy/YouTubePublishStrategy';
import { BilibiliPublishStrategy } from '@/strategy/BilibiliPublishStrategy';
import { BaiduVideoPublishStrategy } from '@/strategy/BaiduVideoPublishStrategy';
import { PublishPlatform, PublishStatus } from '@/entityTypes/videoPublishType';
import { VideoDownloadEntity } from '@/entity/VideoDownload.entity';
import { PublishOptions } from '@/strategy/VideoPublishStrategy';
import { VideoPublishService } from '@/service/VideoPublishService';

// Mock Puppeteer Browser and Page
const mockPage = {
  goto: vi.fn(),
  waitForSelector: vi.fn().mockResolvedValue({ evaluate: vi.fn().mockResolvedValue('http://video.url') }),
  $: vi.fn().mockResolvedValue(null),
  type: vi.fn(),
  click: vi.fn(),
  setViewport: vi.fn(),
  setCookie: vi.fn(),
  close: vi.fn(),
  evaluateHandle: vi.fn().mockResolvedValue({ asElement: vi.fn().mockReturnValue({ click: vi.fn() }) }),
  boundingBox: vi.fn().mockResolvedValue({}),
  uploadFile: vi.fn(),
};
const mockBrowser = {
  newPage: vi.fn().mockResolvedValue(mockPage),
  close: vi.fn(),
};

vi.mock('puppeteer', () => ({
  Browser: vi.fn(() => mockBrowser),
  Page: vi.fn(() => mockPage),
}));

describe('VideoPublishStrategyFactory', () => {
  let factory: VideoPublishStrategyFactory;
  beforeEach(() => {
    factory = VideoPublishStrategyFactory.getInstance();
  });

  test('returns YouTubePublishStrategy for YOUTUBE', async () => {
    const strategy = await factory.createStrategy(PublishPlatform.YOUTUBE, {} as PublishOptions);
    expect(strategy).toBeInstanceOf(YouTubePublishStrategy);
  });
  test('returns BilibiliPublishStrategy for BILIBILI', async () => {
    const strategy = await factory.createStrategy(PublishPlatform.BILIBILI, {} as PublishOptions);
    expect(strategy).toBeInstanceOf(BilibiliPublishStrategy);
  });
  test('returns BaiduVideoPublishStrategy for BAIDU', async () => {
    const strategy = await factory.createStrategy(PublishPlatform.BAIDU, {} as PublishOptions);
    expect(strategy).toBeInstanceOf(BaiduVideoPublishStrategy);
  });
  test('throws error for unsupported platform', async () => {
    // @ts-expect-error
    await expect(factory.createStrategy('unsupported', {})).rejects.toThrow('Unsupported platform');
  });
});

describe('YouTubePublishStrategy', () => {
  let strategy: YouTubePublishStrategy;
  beforeEach(() => {
    strategy = new YouTubePublishStrategy(mockBrowser as any);
    // @ts-ignore
    strategy.page = mockPage;
  });
  test('validateOptions returns true for valid options', async () => {
    const options: PublishOptions = { title: 'Test', description: 'Desc' };
    expect(await strategy.validateOptions(options)).toBe(true);
  });
  test('publish fails if not logged in', async () => {
    mockPage.waitForSelector.mockResolvedValueOnce({ evaluate: vi.fn().mockResolvedValue('') });
    mockPage.$.mockResolvedValueOnce({}); // sign-in button exists
    const video = { savepath: '/tmp/video.mp4' } as VideoDownloadEntity;
    await expect(strategy.publish(video, { title: 'Test' })).resolves.toMatchObject({ publishStatus: PublishStatus.FAILED });
  });
  test('publish fails if no savepath', async () => {
    const video = {} as VideoDownloadEntity;
    await expect(strategy.publish(video, { title: 'Test' })).resolves.toMatchObject({ publishStatus: PublishStatus.FAILED });
  });
});

describe('BilibiliPublishStrategy', () => {
  let strategy: BilibiliPublishStrategy;
  beforeEach(() => {
    strategy = new BilibiliPublishStrategy(mockBrowser as any);
    // @ts-ignore
    strategy.page = mockPage;
  });
  test('validateOptions returns true for valid options', async () => {
    const options: PublishOptions = { title: 'Test', description: 'Desc' };
    expect(await strategy.validateOptions(options)).toBe(true);
  });
  test('publish fails if not logged in', async () => {
    mockPage.waitForSelector.mockResolvedValueOnce({ evaluate: vi.fn().mockResolvedValue('') });
    mockPage.$.mockResolvedValueOnce({}); // login check fails
    const video = { savepath: '/tmp/video.mp4', language: 'en' } as VideoDownloadEntity;
    await expect(strategy.publish(video, { title: 'Test' })).resolves.toMatchObject({ publishStatus: PublishStatus.FAILED });
  });
  test('publish fails if no savepath', async () => {
    const video = {} as VideoDownloadEntity;
    await expect(strategy.publish(video, { title: 'Test' })).resolves.toMatchObject({ publishStatus: PublishStatus.FAILED });
  });
});

describe('BaiduVideoPublishStrategy', () => {
  let strategy: BaiduVideoPublishStrategy;
  beforeEach(() => {
    strategy = new BaiduVideoPublishStrategy(mockBrowser as any);
    // @ts-ignore
    strategy.page = mockPage;
  });
  test('validateOptions returns true for valid options', async () => {
    const options: PublishOptions = { title: 'Test', description: 'Desc' };
    expect(await strategy.validateOptions(options)).toBe(true);
  });
  test('publish fails if not logged in', async () => {
    mockPage.waitForSelector.mockResolvedValueOnce({ evaluate: vi.fn().mockResolvedValue('') });
    mockPage.$.mockResolvedValueOnce({}); // login check fails
    const video = { savepath: '/tmp/video.mp4' } as VideoDownloadEntity;
    await expect(strategy.publish(video, { title: 'Test' })).resolves.toMatchObject({ publishStatus: PublishStatus.FAILED });
  });
  test('publish fails if no savepath', async () => {
    const video = {} as VideoDownloadEntity;
    await expect(strategy.publish(video, { title: 'Test' })).resolves.toMatchObject({ publishStatus: PublishStatus.FAILED });
  });
});

describe('VideoPublishService', () => {
  let service: VideoPublishService;
  beforeEach(() => {
    service = new VideoPublishService();
  });
  test('publishVideo returns failed record on error', async () => {
    const video = {} as VideoDownloadEntity;
    const result = await service.publishVideo(video, PublishPlatform.YOUTUBE, { title: 'Test' });
    expect(result.status).toBe(PublishStatus.FAILED);
  });
  test('publishToMultiplePlatforms returns array of results', async () => {
    const video = {} as VideoDownloadEntity;
    const results = await service.publishToMultiplePlatforms(video, [PublishPlatform.YOUTUBE, PublishPlatform.BILIBILI], { title: 'Test' });
    expect(Array.isArray(results)).toBe(true);
    expect(results.length).toBe(2);
  });
}); 