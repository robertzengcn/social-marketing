/**
 * Central export of all TypeORM entities for test database setup
 * Import this file to get TEST_ENTITIES array for DatabaseTestHelper
 */

// System settings
import { SystemSettingGroupEntity } from "@/entity/SystemSettingGroup.entity";
import { SystemSettingEntity } from "@/entity/SystemSetting.entity";
import { SystemSettingOptionEntity } from "@/entity/SystemSettingOption.entity";

// Account & Authentication
import { AccountCookiesEntity } from "@/entity/AccountCookies.entity";

// Email Marketing
import { BuckemailTaskEntity } from "@/entity/BuckemailTask.entity";
import { EmailTemplateEntity } from "@/entity/EmailTemplate.entity";
import { EmailFilterEntity } from "@/entity/EmailFilter.entity";
import { EmailFilterDetailEntity } from "@/entity/EmailFilterDetail.entity";
import { EmailTemplateTaskRelationEntity } from "@/entity/EmailTemplateTaskRelation.entity";
import { EmailFilterTaskRelationEntity } from "@/entity/EmailFilterTaskRelation.entity";
import { EmailServiceEntity } from "@/entity/EmailService.entity";
import { EmailServiceTaskRelationEntity } from "@/entity/EmailServiceTaskRelation.entity";
import { EmailMarketingTaskEntity } from "@/entity/EmailMarketingTask.entity";
import { EmailMarketingTaskDetailEntity } from "@/entity/EmailMarketingTaskDetail.entity";
import { EmailSearchResultEntity } from "@/entity/EmailSearchResult.entity";
import { EmailSearchResultDetailEntity } from "@/entity/EmailSearchResultDetail.entity";
import { EmailSearchTaskEntity } from "@/entity/EmailSearchTask.entity";
import { EmailSearchTaskUrlEntity } from "@/entity/EmailSearchTaskUrl.entity";
import { EmailSearchTaskProxyEntity } from "@/entity/EmailSearchTaskProxy.entity";
import { EmailMarketingSendLogEntity } from "@/entity/EmailMarketingSendLog.entity";

// Video Processing
import { VideoCaptionEntity } from "@/entity/VideoCaption.entity";
import { VideoDescriptionEntity } from "@/entity/VideoDescription.entity";
import { VideoDownloadEntity } from "@/entity/VideoDownload.entity";
import { VideoDownloadTaskEntity } from "@/entity/VideoDownloadTask.entity";
import { VideoDownloadTaskAccountsEntity } from "@/entity/VideoDownloadTaskAccounts.entity";
import { VideoDownloadTaskDetailEntity } from "@/entity/VideoDownloadTaskDetail.entity";
import { VideoDownloadTaskProxyEntity } from "@/entity/VideoDownloadTaskProxy.entity";
import { VideoDownloadTaskUrlsEntity } from "@/entity/VideoDownloadTaskUrls.entity";
import { VideoDownloadTagEntity } from "@/entity/VideoDownloadTag.entity";
import { VideoPublishRecordEntity } from "@/entity/VideoPublishRecord.entity";

// Search & Scraping
import { ExtraModuleEntity } from "@/entity/ExtraModule.entity";
import { ProxyCheckEntity } from "@/entity/ProxyCheck.entity";
import { ProxyEntity } from "@/entity/Proxy.entity";
import { SearchKeywordEntity } from "@/entity/SearchKeyword.entity";
import { SearchResultEntity } from "@/entity/SearchResult.entity";
import { TaskRunEntity } from "@/entity/TaskRun.entity";
import { VideoDownloadTaskKeywordEntity } from "@/entity/VideoDownloadTaskKeyword.entity";
import { SearchTaskEntity } from "@/entity/SearchTask.entity";
import { SearchTaskProxyEntity } from "@/entity/SearchTaskProxy.entity";
import { SearchAccountEntity } from "@/entity/SearchAccount.entity";

// Scheduling
import { ScheduleTaskEntity } from "@/entity/ScheduleTask.entity";
import { ScheduleExecutionLogEntity } from "@/entity/ScheduleExecutionLog.entity";
import { ScheduleDependencyEntity } from "@/entity/ScheduleDependency.entity";
import { SchedulerStatusEntity } from "@/entity/SchedulerStatus.entity";

// Outreach Automation
import { OutreachTaskEntity } from "@/entity/OutreachTask.entity";
import { OutContactEntity } from "@/entity/OutContact.entity";
import { OutreachMessageEntity } from "@/entity/OutreachMessage.entity";
import { OutreachCampaignEntity } from "@/entity/OutreachCampaign.entity";
import { ScrapingLogEntity } from "@/entity/ScrapingLog.entity";

// Re-export all entities for convenience
export { SystemSettingGroupEntity, SystemSettingEntity, SystemSettingOptionEntity };
export { AccountCookiesEntity };
export { BuckemailTaskEntity, EmailTemplateEntity, EmailFilterEntity, EmailFilterDetailEntity };
export { EmailTemplateTaskRelationEntity, EmailFilterTaskRelationEntity, EmailServiceEntity };
export { EmailServiceTaskRelationEntity, EmailMarketingTaskEntity, EmailMarketingTaskDetailEntity };
export { EmailSearchResultEntity, EmailSearchResultDetailEntity, EmailSearchTaskEntity };
export { EmailSearchTaskUrlEntity, EmailSearchTaskProxyEntity, EmailMarketingSendLogEntity };
export { VideoCaptionEntity, VideoDescriptionEntity, VideoDownloadEntity, VideoDownloadTaskEntity };
export { VideoDownloadTaskAccountsEntity, VideoDownloadTaskDetailEntity, VideoDownloadTaskProxyEntity };
export { VideoDownloadTaskUrlsEntity, VideoDownloadTagEntity, VideoPublishRecordEntity };
export { ExtraModuleEntity, ProxyCheckEntity, ProxyEntity, SearchKeywordEntity };
export { SearchResultEntity, TaskRunEntity, VideoDownloadTaskKeywordEntity };
export { SearchTaskEntity, SearchTaskProxyEntity, SearchAccountEntity };
export { ScheduleTaskEntity, ScheduleExecutionLogEntity, ScheduleDependencyEntity, SchedulerStatusEntity };
export { OutreachTaskEntity, OutContactEntity, OutreachMessageEntity, OutreachCampaignEntity, ScrapingLogEntity };

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
