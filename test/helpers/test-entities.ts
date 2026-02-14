/**
 * Central export of all TypeORM entities for test database setup
 * Import this file to get TEST_ENTITIES array for DatabaseTestHelper
 */

// System settings
export { SystemSettingGroupEntity } from "@/entity/SystemSettingGroup.entity";
export { SystemSettingEntity } from "@/entity/SystemSetting.entity";
export { SystemSettingOptionEntity } from "@/entity/SystemSettingOption.entity";

// Account & Authentication
export { AccountCookiesEntity } from "@/entity/AccountCookies.entity";

// Email Marketing
export { BuckemailTaskEntity } from "@/entity/BuckemailTask.entity";
export { EmailTemplateEntity } from "@/entity/EmailTemplate.entity";
export { EmailFilterEntity } from "@/entity/EmailFilter.entity";
export { EmailFilterDetailEntity } from "@/entity/EmailFilterDetail.entity";
export { EmailTemplateTaskRelationEntity } from "@/entity/EmailTemplateTaskRelation.entity";
export { EmailFilterTaskRelationEntity } from "@/entity/EmailFilterTaskRelation.entity";
export { EmailServiceEntity } from "@/entity/EmailService.entity";
export { EmailServiceTaskRelationEntity } from "@/entity/EmailServiceTaskRelation.entity";
export { EmailMarketingTaskEntity } from "@/entity/EmailMarketingTask.entity";
export { EmailMarketingTaskDetailEntity } from "@/entity/EmailMarketingTaskDetail.entity";
export { EmailSearchResultEntity } from "@/entity/EmailSearchResult.entity";
export { EmailSearchResultDetailEntity } from "@/entity/EmailSearchResultDetail.entity";
export { EmailSearchTaskEntity } from "@/entity/EmailSearchTask.entity";
export { EmailSearchTaskUrlEntity } from "@/entity/EmailSearchTaskUrl.entity";
export { EmailSearchTaskProxyEntity } from "@/entity/EmailSearchTaskProxy.entity";
export { EmailMarketingSendLogEntity } from "@/entity/EmailMarketingSendLog.entity";

// Video Processing
export { VideoCaptionEntity } from "@/entity/VideoCaption.entity";
export { VideoDescriptionEntity } from "@/entity/VideoDescription.entity";
export { VideoDownloadEntity } from "@/entity/VideoDownload.entity";
export { VideoDownloadTaskEntity } from "@/entity/VideoDownloadTask.entity";
export { VideoDownloadTaskAccountsEntity } from "@/entity/VideoDownloadTaskAccounts.entity";
export { VideoDownloadTaskDetailEntity } from "@/entity/VideoDownloadTaskDetail.entity";
export { VideoDownloadTaskProxyEntity } from "@/entity/VideoDownloadTaskProxy.entity";
export { VideoDownloadTaskUrlsEntity } from "@/entity/VideoDownloadTaskUrls.entity";
export { VideoDownloadTagEntity } from "@/entity/VideoDownloadTag.entity";
export { VideoPublishRecordEntity } from "@/entity/VideoPublishRecord.entity";

// Search & Scraping
export { ExtraModuleEntity } from "@/entity/ExtraModule.entity";
export { ProxyCheckEntity } from "@/entity/ProxyCheck.entity";
export { ProxyEntity } from "@/entity/Proxy.entity";
export { SearchKeywordEntity } from "@/entity/SearchKeyword.entity";
export { SearchResultEntity } from "@/entity/SearchResult.entity";
export { TaskRunEntity } from "@/entity/TaskRun.entity";
export { VideoDownloadTaskKeywordEntity } from "@/entity/VideoDownloadTaskKeyword.entity";
export { SearchTaskEntity } from "@/entity/SearchTask.entity";
export { SearchTaskProxyEntity } from "@/entity/SearchTaskProxy.entity";
export { SearchAccountEntity } from "@/entity/SearchAccount.entity";

// Scheduling
export { ScheduleTaskEntity } from "@/entity/ScheduleTask.entity";
export { ScheduleExecutionLogEntity } from "@/entity/ScheduleExecutionLog.entity";
export { ScheduleDependencyEntity } from "@/entity/ScheduleDependency.entity";
export { SchedulerStatusEntity } from "@/entity/SchedulerStatus.entity";

// Outreach Automation
export { OutreachTaskEntity } from "@/entity/OutreachTask.entity";
export { OutContactEntity } from "@/entity/OutContact.entity";
export { OutreachMessageEntity } from "@/entity/OutreachMessage.entity";
export { OutreachCampaignEntity } from "@/entity/OutreachCampaign.entity";
export { ScrapingLogEntity } from "@/entity/ScrapingLog.entity";

/**
 * Array of all entities for database setup
 * Usage: await DatabaseTestHelper.createInMemoryDatabase(TEST_ENTITIES)
 */
export const TEST_ENTITIES = [
    // System settings
    SystemSettingGroupEntity,
    SystemSettingEntity,
    SystemSettingOptionEntity,

    // Account & authentication
    AccountCookiesEntity,

    // Email marketing
    BuckemailTaskEntity,
    EmailTemplateEntity,
    EmailFilterEntity,
    EmailFilterDetailEntity,
    EmailTemplateTaskRelationEntity,
    EmailFilterTaskRelationEntity,
    EmailServiceEntity,
    EmailServiceTaskRelationEntity,
    EmailMarketingTaskEntity,
    EmailMarketingTaskDetailEntity,
    EmailSearchResultEntity,
    EmailSearchResultDetailEntity,
    EmailSearchTaskEntity,
    EmailSearchTaskUrlEntity,
    EmailSearchTaskProxyEntity,
    EmailMarketingSendLogEntity,

    // Video processing
    VideoCaptionEntity,
    VideoDescriptionEntity,
    VideoDownloadEntity,
    VideoDownloadTaskEntity,
    VideoDownloadTaskAccountsEntity,
    VideoDownloadTaskDetailEntity,
    VideoDownloadTaskProxyEntity,
    VideoDownloadTaskUrlsEntity,
    VideoDownloadTagEntity,
    VideoPublishRecordEntity,

    // Search & scraping
    ExtraModuleEntity,
    ProxyCheckEntity,
    ProxyEntity,
    SearchKeywordEntity,
    SearchResultEntity,
    TaskRunEntity,
    VideoDownloadTaskKeywordEntity,
    SearchTaskEntity,
    SearchTaskProxyEntity,
    SearchAccountEntity,

    // Scheduling
    ScheduleTaskEntity,
    ScheduleExecutionLogEntity,
    ScheduleDependencyEntity,
    SchedulerStatusEntity,

    // Outreach automation
    OutreachTaskEntity,
    OutContactEntity,
    OutreachMessageEntity,
    OutreachCampaignEntity,
    ScrapingLogEntity,
];
