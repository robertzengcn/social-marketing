# Tasks: AI-Powered User Outreach Automation

**Input**: Design documents from `/specs/001-ai-outreach/`
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, contracts/ ✅

**Tests**: Tests are NOT explicitly requested in the feature specification. Test tasks are included for each user story but can be skipped if not following TDD approach.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/`, `tests/` at repository root
- Paths shown below follow the single project structure from plan.md

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Add outreach entities to TypeORM configuration in src/config/SqliteDb.ts
- [ ] T002 Create outreach strategy directory structure in src/strategy/
- [ ] T003 Create outreach module directory structure in src/modules/outreach/
- [ ] T004 [P] Add English translation keys for outreach feature in src/views/lang/en.ts
- [ ] T005 [P] Add Chinese translation keys for outreach feature in src/views/lang/zh.ts

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T006 Create ProcessMessage types for outreach worker communication in src/entityTypes/processMessage-type.ts
- [ ] T007 [P] Create OutreachScrapingStrategy interface in src/strategy/OutreachScrapingStrategy.ts
- [ ] T008 [P] Create BaseWebScraper abstract class in src/strategy/BaseWebScraper.ts
- [ ] T009 [P] Create OutreachStrategy interface in src/strategy/OutreachStrategy.ts
- [ ] T010 [P] Create BaseOutreachStrategy abstract class in src/strategy/BaseOutreachStrategy.ts
- [ ] T011 [P] Create OutreachScrapingFactory in src/strategy/OutreachScrapingFactory.ts
- [ ] T012 [P] Create OutreachStrategyFactory in src/strategy/OutreachStrategyFactory.ts
- [ ] T013 [P] Setup stealth plugins configuration for Puppeteer in src/strategy/BaseWebScraper.ts

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Web Scraping and Contact Collection (Priority: P1) 🎯 MVP

**Goal**: Scrape websites to collect contact information (emails, URLs, names) and store in local database

**Independent Test**: Create scraping task for single website, verify contacts are accurately scraped, deduplicated by email, and persisted in database. Verify real-time progress updates.

### Implementation for User Story 1

**Database Entities**:
- [ ] T014 [P] [US1] Create OutContactEntity in src/entity/OutContact.entity.ts
- [ ] T015 [P] [US1] Create OutreachTaskEntity in src/entity/OutreachTask.entity.ts
- [ ] T016 [P] [US1] Create ScrapingLogEntity in src/entity/ScrapingLog.entity.ts

**Scraper Strategy Implementation**:
- [ ] T017 [P] [US1] Create GenericWebScraper in src/strategy/GenericWebScraper.ts
- [ ] T018 [P] [US1] Implement email extraction logic in src/strategy/BaseWebScraper.ts
- [ ] T019 [P] [US1] Implement URL extraction logic in src/strategy/BaseWebScraper.ts
- [ ] T020 [P] [US1] Implement anti-bot detection methods in src/strategy/BaseWebScraper.ts
- [ ] T021 [P] [US1] Implement stealth mode setup in src/strategy/BaseWebScraper.ts

**Child Process Worker**:
- [ ] T022 [US1] Create outreachScraper.ts child process in src/childprocess/outreachScraper.ts
- [ ] T023 [US1] Implement ProcessMessage handler for scraping-start in src/childprocess/outreachScraper.ts
- [ ] T024 [US1] Implement scraping progress reporting in src/childprocess/outreachScraper.ts
- [ ] T025 [US1] Implement concurrent scraping with rate limiting in src/childprocess/outreachScraper.ts
- [ ] T026 [US1] Implement error handling and retry logic in src/childprocess/outreachScraper.ts

**Business Logic**:
- [ ] T027 [US1] Create OutreachModel in src/model/outreach.model.ts
- [ ] T028 [US1] Create OutreachModule in src/modules/outreach/OutreachModule.ts
- [ ] T029 [US1] Create OutreachController in src/modules/outreach/OutreachController.ts
- [ ] T030 [US1] Implement scraping task creation logic in src/modules/outreach/OutreachController.ts
- [ ] T031 [US1] Implement contact deduplication in src/modules/outreach/OutreachController.ts
- [ ] T032 [US1] Implement scraping status tracking in src/modules/outreach/OutreachController.ts
- [ ] T033 [US1] Implement ScrapingManager in src/modules/outreach/ScrapingManager.ts

**IPC Handlers**:
- [ ] T034 [US1] Register outreach IPC handlers in src/main-process/communication/index.ts
- [ ] T035 [US1] Create scraping task IPC handler in src/main-process/communication/outreach-ipc.ts
- [ ] T036 [US1] Create scraping status IPC handler in src/main-process/communication/outreach-ipc.ts
- [ ] T037 [US1] Create contact list IPC handler in src/main-process/communication/outreach-ipc.ts
- [ ] T038 [US1] Implement progress event emission in src/main-process/communication/outreach-ipc.ts

**Frontend Components**:
- [ ] T039 [P] [US1] Create ScrapingTask.vue component in src/views/pages/outreach/ScrapingTask.vue
- [ ] T040 [P] [US1] Create ContactList.vue component in src/views/pages/outreach/ContactList.vue
- [ ] T041 [P] [US1] Add outreach routes to Vue router
- [ ] T042 [US1] Implement scraping task form in src/views/pages/outreach/ScrapingTask.vue
- [ ] T043 [US1] Implement real-time progress display in src/views/pages/outreach/ScrapingTask.vue
- [ ] T044 [US1] Implement contact filtering and search in src/views/pages/outreach/ContactList.vue
- [ ] T045 [US1] Implement contact export functionality in src/views/pages/outreach/ContactList.vue

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - AI Message Generation (Priority: P2)

**Goal**: Generate personalized AI messages for collected contacts using remote AI service

**Independent Test**: Provide sample contact data (with URLs/profiles), request message generation, verify AI-generated messages are received, personalized based on website content, and stored in database.

### Implementation for User Story 2

**Database Entities**:
- [ ] T046 [P] [US2] Create OutreachMessageEntity in src/entity/OutreachMessage.entity.ts

**AI Service Integration**:
- [ ] T047 [P] [US2] Create AIOutreachAPIClient in src/api/ai-outreach-api.ts
- [ ] T048 [P] [US2] Implement generateMessage method with retry logic in src/api/ai-outreach-api.ts
- [ ] T049 [P] [US2] Implement generateBatchMessages with concurrency in src/api/ai-outreach-api.ts
- [ ] T050 [P] [US2] Implement validateMessage method in src/api/ai-outreach-api.ts
- [ ] T051 [P] [US2] Implement getServiceStatus health check in src/api/ai-outreach-api.ts
- [ ] T052 [P] [US2] Implement exponential backoff retry in src/api/ai-outreach-api.ts

**Business Logic**:
- [ ] T053 [US2] Extend OutreachModule with message generation in src/modules/outreach/OutreachModule.ts
- [ ] T054 [US2] Implement single message generation in src/modules/outreach/OutreachController.ts
- [ ] T055 [US2] Implement batch message generation in src/modules/outreach/OutreachController.ts
- [ ] T056 [US2] Implement message validation before saving in src/modules/outreach/OutreachController.ts
- [ ] T057 [US2] Implement message quality scoring in src/modules/outreach/OutreachController.ts

**IPC Handlers**:
- [ ] T058 [US2] Create message generation IPC handler in src/main-process/communication/outreach-ipc.ts
- [ ] T059 [US2] Create batch message generation IPC handler in src/main-process/communication/outreach-ipc.ts
- [ ] T060 [US2] Create message update IPC handler in src/main-process/communication/outreach-ipc.ts
- [ ] T061 [US2] Create message review IPC handler in src/main-process/communication/outreach-ipc.ts

**Frontend Components**:
- [ ] T062 [P] [US2] Create MessageGeneration.vue component in src/views/pages/outreach/MessageGeneration.vue
- [ ] T063 [US2] Implement message generation form in src/views/pages/outreach/MessageGeneration.vue
- [ ] T064 [US2] Implement batch generation UI in src/views/pages/outreach/MessageGeneration.vue
- [ ] T065 [US2] Implement message review and editing in src/views/pages/outreach/MessageGeneration.vue
- [ ] T066 [US2] Display quality scores and suggestions in src/views/pages/outreach/MessageGeneration.vue
- [ ] T067 [P] [US2] Update ContactList.vue to display generated messages

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Multi-Channel Message Sending (Priority: P3)

**Goal**: Send AI-generated messages via multiple channels (email, comments, direct messages) and track delivery status

**Independent Test**: Use pre-generated messages, verify they are sent successfully via email/comments/direct messaging, proper tracking information is recorded, and status is correctly updated.

### Implementation for User Story 3

**Database Entities**:
- [ ] T068 [P] [US3] Create OutreachCampaignEntity in src/entity/OutreachCampaign.entity.ts
- [ ] T069 [P] [US3] Create OutreachCommentEntity in src/entity/OutreachComment.entity.ts
- [ ] T070 [P] [US3] Create OutreachDirectMessageEntity in src/entity/OutreachDirectMessage.entity.ts

**Outreach Strategy Implementation**:
- [ ] T071 [P] [US3] Create EmailOutreachStrategy in src/strategy/EmailOutreachStrategy.ts
- [ ] T072 [P] [US3] Create CommentOutreachStrategy in src/strategy/CommentOutreachStrategy.ts
- [ ] T073 [P] [US3] Create DirectMessageOutreachStrategy in src/strategy/DirectMessageOutreachStrategy.ts
- [ ] T074 [P] [US3] Implement WordPress comment detection and posting in src/strategy/CommentOutreachStrategy.ts
- [ ] T075 [P] [US3] Implement Disqus comment detection and posting in src/strategy/CommentOutreachStrategy.ts
- [ ] T076 [P] [US3] Implement generic comment posting in src/strategy/CommentOutreachStrategy.ts
- [ ] T077 [P] [US3] Implement contact form detection and filling in src/strategy/DirectMessageOutreachStrategy.ts
- [ ] T078 [P] [US3] Implement LinkedIn messaging in src/strategy/DirectMessageOutreachStrategy.ts (future)
- [ ] T079 [P] [US3] Update OutreachStrategyFactory with strategy selection in src/strategy/OutreachStrategyFactory.ts

**Child Process Worker**:
- [ ] T080 [US3] Create outreachPoster.ts child process in src/childprocess/outreachPoster.ts
- [ ] T081 [US3] Implement ProcessMessage handler for posting actions in src/childprocess/outreachPoster.ts
- [ ] T082 [US3] Implement comment posting with browser automation in src/childprocess/outreachPoster.ts
- [ ] T083 [US3] Implement contact form submission in src/childprocess/outreachPoster.ts
- [ ] T084 [US3] Implement posting result reporting in src/childprocess/outreachPoster.ts
- [ ] T085 [US3] Implement authentication for posting platforms in src/childprocess/outreachPoster.ts

**Business Logic**:
- [ ] T086 [US3] Extend OutreachModule with outreach sending in src/modules/outreach/OutreachModule.ts
- [ ] T087 [US3] Implement OutreachManager in src/modules/outreach/OutreachManager.ts
- [ ] T088 [US3] Implement campaign creation logic in src/modules/outreach/OutreachController.ts
- [ ] T089 [US3] Implement email campaign sending in src/modules/outreach/OutreachController.ts
- [ ] T090 [US3] Implement comment posting orchestration in src/modules/outreach/OutreachController.ts
- [ ] T091 [US3] Implement direct message sending orchestration in src/modules/outreach/OutreachController.ts
- [ ] T092 [US3] Implement delivery status tracking in src/modules/outreach/OutreachController.ts
- [ ] T093 [US3] Integrate with existing email infrastructure in src/modules/outreach/OutreachController.ts

**IPC Handlers**:
- [ ] T094 [US3] Create campaign IPC handlers in src/main-process/communication/outreach-ipc.ts
- [ ] T095 [US3] Create outreach posting IPC handlers in src/main-process/communication/outreach-ipc.ts
- [ ] T096 [US3] Implement campaign status polling in src/main-process/communication/outreach-ipc.ts

**Frontend Components**:
- [ ] T097 [P] [US3] Create CampaignManagement.vue component in src/views/pages/outreach/CampaignManagement.vue
- [ ] T098 [P] [US3] Create CommentPosting.vue component in src/views/pages/outreach/CommentPosting.vue
- [ ] T099 [P] [US3] Create DirectMessaging.vue component in src/views/pages/outreach/DirectMessaging.vue
- [ ] T100 [US3] Implement campaign creation UI in src/views/pages/outreach/CampaignManagement.vue
- [ ] T101 [US3] Implement real-time sending progress in src/views/pages/outreach/CampaignManagement.vue
- [ ] T102 [US3] Implement campaign statistics display in src/views/pages/outreach/CampaignManagement.vue
- [ ] T103 [US3] Implement comment posting UI in src/views/pages/outreach/CommentPosting.vue
- [ ] T104 [US3] Implement direct messaging UI in src/views/pages/outreach/DirectMessaging.vue
- [ ] T105 [P] [US3] Update ContactList.vue with campaign assignments

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T106 [P] Implement comprehensive error handling across all outreach components in src/modules/outreach/
- [ ] T107 [P] Add rate limiting configuration UI in src/views/pages/outreach/ScrapingTask.vue
- [ ] T108 [P] Implement proxy management integration in src/modules/outreach/OutreachController.ts
- [ ] T109 [P] Add logging infrastructure using electron-log in src/modules/outreach/
- [ ] T110 [P] Implement data export functionality (CSV, JSON) in src/model/outreach.model.ts
- [ ] T111 [P] Add unsubscribe/opt-out handling in src/modules/outreach/OutreachController.ts
- [ ] T112 [P] Implement data validation for scraped emails in src/modules/outreach/ScrapingManager.ts
- [ ] T113 [P] Add loading states and spinners across all Vue components in src/views/pages/outreach/
- [ ] T114 [P] Implement toast notifications for operations in src/views/pages/outreach/
- [ ] T115 [P] Add keyboard shortcuts and accessibility features in src/views/pages/outreach/

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-5)**: All depend on Foundational phase completion
  - US1 (P1): Can start after Foundational - No dependencies on other stories
  - US2 (P2): Can start after Foundational - Depends on US1 for contact data but can test independently
  - US3 (P3): Can start after Foundational - Depends on US1 & US2 but can test independently with pre-generated data
- **Polish (Phase 6)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1) - Scraping**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2) - AI Generation**: Can start after Foundational (Phase 2) - May use US1 contact data but independently testable with sample data
- **User Story 3 (P3) - Message Sending**: Can start after Foundational (Phase 2) - Depends on US1 & US2 but independently testable with manual test data

### Within Each User Story

- Models → Services → Endpoints → Integration
- Story complete before moving to next priority

### Parallel Opportunities

- **Setup Phase**: T001-T005 can run in parallel (different files)
- **Foundational Phase**: All T006-T013 can run in parallel (different files)
- **User Story 1**:
  - Entities (T014-T016): Can run in parallel
  - Scrapers (T017-T021): Can run in parallel
  - Frontend (T039-T045): Can run in parallel
- **User Story 2**:
  - Entity (T046): Independent
  - AI Service (T047-T052): Can run in parallel
  - Frontend (T062-T067): Can run in parallel
- **User Story 3**:
  - Entities (T068-T070): Can run in parallel
  - Outreach Strategies (T071-T079): Can run in parallel
  - Frontend (T097-T105): Can run in parallel
- **Polish Phase**: All T106-T115 can run in parallel (different files/concerns)

Once Foundational phase completes, all user stories can start in parallel (if team capacity allows).

---

## Parallel Example: User Story 1

```bash
# Launch all entity models for User Story 1 together:
Task: "T014 [P] [US1] Create OutContactEntity in src/entity/OutContact.entity.ts"
Task: "T015 [P] [US1] Create OutreachTaskEntity in src/entity/OutreachTask.entity.ts"
Task: "T016 [P] [US1] Create ScrapingLogEntity in src/entity/ScrapingLog.entity.ts"

# After entities, launch scraper implementations:
Task: "T017 [P] [US1] Create GenericWebScraper in src/strategy/GenericWebScraper.ts"
Task: "T018 [P] [US1] Implement email extraction logic in src/strategy/BaseWebScraper.ts"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only - Scraping)

1. Complete Phase 1: Setup (T001-T005)
2. Complete Phase 2: Foundational (T006-T013) - CRITICAL
3. Complete Phase 3: User Story 1 (T014-T045)
4. **STOP and VALIDATE**: Test scraping independently
5. Deploy/demo scraping functionality

**MVP Delivers**: Ability to scrape websites, collect contacts, deduplicate by email, and view contact list.

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 (Scraping) → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 (AI Generation) → Test independently → Deploy/Demo
4. Add User Story 3 (Multi-Channel Sending) → Test independently → Deploy/Demo
5. Add Polish & Cross-Cutting Concerns → Final polish

Each story adds value without breaking previous stories.

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (Scraping) - T014-T045
   - Developer B: User Story 2 (AI Generation) - T046-T067
   - Developer C: User Story 3 (Sending) - T068-T105
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- All scraping and posting operations run in child processes (non-blocking)
- All UI text must be internationalized (EN/ZH translations)
- Verify all tasks follow checklist format (checkbox, ID, labels, file paths)

---

## Summary

- **Total Tasks**: 115
- **Setup Phase (Phase 1)**: 5 tasks
- **Foundational Phase (Phase 2)**: 8 tasks
- **User Story 1 - Scraping (Phase 3)**: 32 tasks
- **User Story 2 - AI Generation (Phase 4)**: 22 tasks
- **User Story 3 - Multi-Channel Sending (Phase 5)**: 38 tasks
- **Polish Phase (Phase 6)**: 10 tasks

**Parallel Opportunities Identified**: Significant parallelization possible within each phase and across user stories

**MVP Scope**: Phase 1 + Phase 2 + Phase 3 = 45 tasks for core scraping functionality

**Format Validation**: ✅ All tasks follow checklist format with checkbox, ID, story labels, and file paths
