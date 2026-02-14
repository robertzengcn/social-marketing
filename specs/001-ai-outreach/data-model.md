# Data Model: AI-Powered User Outreach Automation

**Feature**: AI-Powered User Outreach Automation
**Date**: 2026-02-11
**Database**: SQLite via TypeORM with better-sqlite3 driver

---

## Overview

This document defines the database schema for the AI outreach feature, following TypeORM patterns used in the existing codebase. All entities extend `AuditableEntity` for created/updated timestamp tracking.

---

## Entity Relationship Diagram

```
┌─────────────────────┐       ┌──────────────────────┐
│  OutreachTaskEntity │       │ ScrapingLogEntity    │
│  (Scraping Task)    │       │ (Scraping Logs)      │
├─────────────────────┤       ├──────────────────────┤
│ id (PK)            │       │ id (PK)             │
│ name               │       │ url                 │
│ description        │       │ status              │
│ status             │◄──────│ task_id (FK)        │
│ target_urls        │       │ error_message       │
│ total_contacts     │       │ pages_processed     │
│ error_log          │       │ emails_found        │
│ runtime_log        │       └──────────────────────┘
│ created_at         │
│ updated_at         │       1:N (Task has many logs)
├─────────────────────┤
│ contacts (1:N)     │       ┌──────────────────────┐
└─────────────────────┘       │ OutContactEntity     │
       │                      │ (Contact)            │
       │                      ├──────────────────────┤
       │ 1:N                  │ id (PK)             │
       │                      │ email (Unique)      │
       ▼                      │ website_url         │
┌─────────────────────┐       │ name                │
│ OutContactEntity    │       │ source_url          │
├─────────────────────┤       │ status              │
│ id (PK)            │       │ task_id (FK)        │
│ email (Unique)     │       │ campaign_id (FK)    │
│ website_url        │       │ created_at          │
│ name               │       │ updated_at          │
│ source_url          │       ├──────────────────────┤
│ status              │◄─────│ task_id (FK)        │
│ task_id (FK)        │       │ campaign_id (FK)    │
│ campaign_id (FK)    │       │ message (1:1)       │
│ created_at          │       └──────────────────────┘
│ updated_at          │                │
├─────────────────────┤                │ 1:1
│ message (1:1)       │                │
└─────────────────────┘                ▼
                              ┌──────────────────────┐
                              │ OutreachMessageEntity│
                              │ (AI Message)         │
                              ├──────────────────────┤
                              │ id (PK)             │
                              │ content             │
                              │ ai_metadata         │
                              │ user_edited         │
                              │ reviewed            │
                              │ contact_id (FK)     │
                              │ created_at          │
                              │ updated_at          │
                              └──────────────────────┘


┌─────────────────────┐
│ OutreachCampaignEntity│
│ (Email Campaign)    │
├─────────────────────┤
│ id (PK)            │
│ name               │
│ status             │
│ total_contacts     │
│ sent_count         │
│ failed_count       │
│ error_log          │
│ created_at         │
│ updated_at         │
├─────────────────────┤
│ contacts (1:N)     │
└─────────────────────┘
```

---

## Entity Definitions

### 1. OutreachTaskEntity

**Table Name**: `outreach_task`
**Purpose**: Represents a web scraping task that collects contacts from one or more target URLs.

**Fields**:

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | integer | PRIMARY KEY, AUTO_INCREMENT | Unique task identifier |
| name | text | NOT NULL | User-defined task name |
| description | text | NULLABLE | Task description |
| status | integer | NOT NULL, DEFAULT 0 | Task status: 0=pending, 1=running, 2=completed, 3=failed |
| target_urls | text | NOT NULL (JSON array) | Array of URLs to scrape |
| total_contacts | integer | NULLABLE | Total unique contacts found |
| error_log | text | NULLABLE | Error messages if task failed |
| runtime_log | text | NULLABLE | Runtime execution logs |
| created_at | datetime | AUTO (from AuditableEntity) | Creation timestamp |
| updated_at | datetime | AUTO (from AuditableEntity) | Last update timestamp |

**Relationships**:
- **One-to-Many with OutContactEntity**: A task has many contacts
- **One-to-Many with ScrapingLogEntity**: A task has many scraping logs

**Indexes**:
- Primary index on `id`
- Index on `status` for filtering running tasks

**Validation Rules**:
- `target_urls` must be valid JSON array of URL strings
- `status` must be in range [0, 3]

**TypeORM Definition**:

```typescript
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { AuditableEntity } from "./order.decorator";
import { OutContactEntity } from "./OutContact.entity";
import { ScrapingLogEntity } from "./ScrapingLog.entity";

@Entity("outreach_task")
export class OutreachTaskEntity extends AuditableEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("text")
    name: string;

    @Column("text", { nullable: true })
    description: string;

    @Column("integer", { default: 0 })
    status: number; // 0: pending, 1: running, 2: completed, 3: failed

    @Column("text")
    target_urls: string; // JSON: ["https://example.com", "https://site2.com"]

    @Column("integer", { nullable: true })
    total_contacts: number;

    @Column("text", { nullable: true })
    error_log: string;

    @Column("text", { nullable: true })
    runtime_log: string;

    @OneToMany(() => OutContactEntity, contact => contact.task)
    contacts: OutContactEntity[];

    @OneToMany(() => ScrapingLogEntity, log => log.task)
    scraping_logs: ScrapingLogEntity[];
}
```

---

### 2. OutContactEntity

**Table Name**: `out_contact`
**Purpose**: Represents a contact (potential customer) scraped from a website.

**Fields**:

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | integer | PRIMARY KEY, AUTO_INCREMENT | Unique contact identifier |
| email | text | NOT NULL, UNIQUE | Contact email address |
| website_url | text | NULLABLE | Contact's website URL |
| name | text | NULLABLE | Contact name (if available) |
| source_url | text | NOT NULL | URL where contact was found |
| status | integer | NOT NULL, DEFAULT 0 | Status: 0=pending, 1=message_generated, 2=sent, 3=failed |
| task_id | integer | NOT NULL, FK | Parent scraping task |
| campaign_id | integer | NULLABLE, FK | Associated campaign (if sent) |
| created_at | datetime | AUTO | Creation timestamp |
| updated_at | datetime | AUTO | Last update timestamp |

**Relationships**:
- **Many-to-One with OutreachTaskEntity**: Belongs to a scraping task
- **Many-to-One with OutreachCampaignEntity**: Assigned to a campaign (optional)
- **One-to-One with OutreachMessageEntity**: Has one AI-generated message

**Indexes**:
- PRIMARY KEY on `id`
- UNIQUE index on `email` (deduplication)
- Index on `task_id` (foreign key)
- Index on `campaign_id` (foreign key)
- Index on `status` (filtering)

**Validation Rules**:
- `email` must be valid email format
- `email` must be unique (enforced by database constraint)
- `status` must be in range [0, 3]
- `task_id` must reference valid `outreach_task.id`

**TypeORM Definition**:

```typescript
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn, Index } from "typeorm";
import { AuditableEntity } from "./order.decorator";
import { OutreachTaskEntity } from "./OutreachTask.entity";
import { OutreachCampaignEntity } from "./OutreachCampaign.entity";
import { OutreachMessageEntity } from "./OutreachMessage.entity";

@Entity("out_contact")
@Index(["email"], { unique: true })
export class OutContactEntity extends AuditableEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("text")
    email: string;

    @Column("text", { nullable: true })
    website_url: string;

    @Column("text", { nullable: true })
    name: string;

    @Column("text")
    source_url: string;

    @Column("integer", { default: 0 })
    status: number; // 0: pending, 1: message_generated, 2: sent, 3: failed

    @Column("integer")
    task_id: number;

    @Column("integer", { nullable: true })
    campaign_id: number;

    @ManyToOne(() => OutreachTaskEntity, task => task.contacts)
    @JoinColumn({ name: "task_id" })
    task: OutreachTaskEntity;

    @ManyToOne(() => OutreachCampaignEntity, campaign => campaign.contacts)
    @JoinColumn({ name: "campaign_id" })
    campaign: OutreachCampaignEntity;

    @OneToOne(() => OutreachMessageEntity, message => message.contact)
    message: OutreachMessageEntity;
}
```

---

### 3. OutreachMessageEntity

**Table Name**: `outreach_message`
**Purpose**: Stores AI-generated outreach messages for each contact.

**Fields**:

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | integer | PRIMARY KEY, AUTO_INCREMENT | Unique message identifier |
| content | text | NOT NULL | AI-generated message content |
| ai_metadata | text | NULLABLE (JSON) | AI server metadata (model, tokens, etc.) |
| user_edited | boolean | DEFAULT false | Whether user edited the message |
| reviewed | boolean | DEFAULT false | Whether user reviewed the message |
| contact_id | integer | NOT NULL, UNIQUE, FK | Associated contact |
| created_at | datetime | AUTO | Creation timestamp |
| updated_at | datetime | AUTO | Last update timestamp |

**Relationships**:
- **One-to-One with OutContactEntity**: Belongs to one contact

**Indexes**:
- PRIMARY KEY on `id`
- UNIQUE index on `contact_id` (one message per contact)
- Index on `reviewed` (filtering unreviewed messages)

**Validation Rules**:
- `content` must not be empty
- `content` minimum length: 50 characters
- `contact_id` must reference valid `out_contact.id`

**TypeORM Definition**:

```typescript
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { AuditableEntity } from "./order.decorator";
import { OutContactEntity } from "./OutContact.entity";

@Entity("outreach_message")
export class OutreachMessageEntity extends AuditableEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("text")
    content: string;

    @Column("text", { nullable: true })
    ai_metadata: string; // JSON: { model: "gpt-4", tokens: 150, timestamp: 1234567890 }

    @Column("boolean", { default: false })
    user_edited: boolean;

    @Column("boolean", { default: false })
    reviewed: boolean;

    @Column("integer")
    contact_id: number;

    @OneToOne(() => OutContactEntity, contact => contact.message)
    @JoinColumn({ name: "contact_id" })
    contact: OutContactEntity;
}
```

---

### 4. OutreachCampaignEntity

**Table Name**: `outreach_campaign`
**Purpose**: Represents a batch email sending campaign for generated messages.

**Fields**:

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | integer | PRIMARY KEY, AUTO_INCREMENT | Unique campaign identifier |
| name | text | NOT NULL | Campaign name |
| status | integer | NOT NULL, DEFAULT 0 | Status: 0=preparing, 1=sending, 2=completed, 3=failed |
| total_contacts | integer | DEFAULT 0 | Total contacts in campaign |
| sent_count | integer | DEFAULT 0 | Number of successfully sent emails |
| failed_count | integer | DEFAULT 0 | Number of failed sends |
| error_log | text | NULLABLE | Error messages if campaign failed |
| created_at | datetime | AUTO | Creation timestamp |
| updated_at | datetime | AUTO | Last update timestamp |

**Relationships**:
- **One-to-Many with OutContactEntity**: Campaign has many contacts

**Indexes**:
- PRIMARY KEY on `id`
- Index on `status` (filtering active campaigns)

**Validation Rules**:
- `status` must be in range [0, 3]
- `sent_count + failed_count <= total_contacts`

**TypeORM Definition**:

```typescript
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { AuditableEntity } from "./order.decorator";
import { OutContactEntity } from "./OutContact.entity";

@Entity("outreach_campaign")
export class OutreachCampaignEntity extends AuditableEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("text")
    name: string;

    @Column("integer", { default: 0 })
    status: number; // 0: preparing, 1: sending, 2: completed, 3: failed

    @Column("integer", { default: 0 })
    total_contacts: number;

    @Column("integer", { default: 0 })
    sent_count: number;

    @Column("integer", { default: 0 })
    failed_count: number;

    @Column("text", { nullable: true })
    error_log: string;

    @OneToMany(() => OutContactEntity, contact => contact.campaign)
    contacts: OutContactEntity[];
}
```

---

### 5. ScrapingLogEntity

**Table Name**: `scraping_log`
**Purpose**: Logs individual scraping events for debugging and monitoring.

**Fields**:

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | integer | PRIMARY KEY, AUTO_INCREMENT | Unique log identifier |
| url | text | NOT NULL | URL that was scraped |
| status | integer | NOT NULL | Status: 0=success, 1=error, 2=blocked |
| error_message | text | NULLABLE | Error message if scraping failed |
| pages_processed | integer | DEFAULT 0 | Number of pages processed |
| emails_found | integer | DEFAULT 0 | Number of emails found |
| task_id | integer | NOT NULL, FK | Parent scraping task |
| created_at | datetime | AUTO | Creation timestamp |

**Relationships**:
- **Many-to-One with OutreachTaskEntity**: Belongs to a scraping task

**Indexes**:
- PRIMARY KEY on `id`
- Index on `task_id` (foreign key)
- Index on `status` (filtering failed scrapes)
- Index on `created_at` (time-based queries)

**Validation Rules**:
- `status` must be in range [0, 2]
- `task_id` must reference valid `outreach_task.id`

**TypeORM Definition**:

```typescript
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { AuditableEntity } from "./order.decorator";
import { OutreachTaskEntity } from "./OutreachTask.entity";

@Entity("scraping_log")
export class ScrapingLogEntity extends AuditableEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("text")
    url: string;

    @Column("integer", { default: 0 })
    status: number; // 0: success, 1: error, 2: blocked

    @Column("text", { nullable: true })
    error_message: string;

    @Column("integer", { default: 0 })
    pages_processed: number;

    @Column("integer", { default: 0 })
    emails_found: number;

    @Column("integer")
    task_id: number;

    @ManyToOne(() => OutreachTaskEntity, task => task.scraping_logs)
    @JoinColumn({ name: "task_id" })
    task: OutreachTaskEntity;
}
```

---

## Data Migration

### Database Configuration Update

The entities must be registered in `src/config/SqliteDb.ts`:

```typescript
// src/config/SqliteDb.ts
import { OutreachTaskEntity } from "../entity/OutreachTask.entity";
import { OutContactEntity } from "../entity/OutContact.entity";
import { OutreachMessageEntity } from "../entity/OutreachMessage.entity";
import { OutreachCampaignEntity } from "../entity/OutreachCampaign.entity";
import { ScrapingLogEntity } from "../entity/ScrapingLog.entity";

export const AppDataSource = new DataSource({
    // ... existing config
    entities: [
        // ... existing entities
        OutreachTaskEntity,
        OutContactEntity,
        OutreachMessageEntity,
        OutreachCampaignEntity,
        ScrapingLogEntity,
    ],
});
```

### Initial Migration Script

```typescript
// Run once to create tables
import { AppDataSource } from "../config/SqliteDb";

async function initializeOutreachTables() {
    await AppDataSource.initialize();
    await AppDataSource.synchronize(); // Creates tables
    console.log("Outreach tables created successfully");
}
```

---

## State Transitions

### OutreachTaskEntity Status Flow

```
pending (0) → running (1) → completed (2)
                     ↘ failed (3)
```

**Transitions**:
- `pending → running`: When scraping starts
- `running → completed`: When all URLs scraped successfully
- `running → failed`: When critical error occurs

### OutContactEntity Status Flow

```
pending (0) → message_generated (1) → sent (2)
                                  ↘ failed (3)
```

**Transitions**:
- `pending → message_generated`: When AI generates message
- `message_generated → sent`: When email sent successfully
- `message_generated → failed`: When email sending fails

### OutreachCampaignEntity Status Flow

```
preparing (0) → sending (1) → completed (2)
                         ↘ failed (3)
```

**Transitions**:
- `preparing → sending`: When first email is sent
- `sending → completed`: When all emails processed
- `sending → failed`: When critical error occurs

---

## Query Patterns

### Common Queries

**1. Get all contacts for a task**:
```typescript
await OutContactEntity.find({
    where: { task_id: taskId },
    relations: ["message", "campaign"]
});
```

**2. Get contacts pending message generation**:
```typescript
await OutContactEntity.find({
    where: { status: 0 }, // pending
    relations: ["task"]
});
```

**3. Get campaign statistics**:
```typescript
await OutreachCampaignEntity.findOne({
    where: { id: campaignId },
    relations: ["contacts"]
});
// Calculate: success_rate = sent_count / total_contacts
```

**4. Get scraping logs for a task**:
```typescript
await ScrapingLogEntity.find({
    where: { task_id: taskId },
    order: { created_at: "DESC" }
});
```

**5. Deduplication check** (automatic via unique constraint):
```typescript
try {
    await OutContactEntity.save(contact);
} catch (error) {
    if (error.code === 'SQLITE_CONSTRAINT') {
        // Duplicate email - skip or update existing
    }
}
```

---

## Summary

| Entity | Primary Purpose | Key Relationships |
|--------|----------------|------------------|
| OutreachTaskEntity | Scraping task management | Has many OutContact, ScrapingLog |
| OutContactEntity | Contact storage | Belongs to Task, Campaign; has Message |
| OutreachMessageEntity | AI-generated message | Belongs to Contact |
| OutreachCampaignEntity | Email campaign tracking | Has many Contacts |
| ScrapingLogEntity | Scraping event logging | Belongs to Task |

All entities extend `AuditableEntity` for automatic `created_at` and `updated_at` timestamp tracking.
