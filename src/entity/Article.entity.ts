import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, Index } from "typeorm";
import { ArticleCodeBlockEntity } from "./ArticleCodeBlock.entity";
import { ArticleMetadataEntity } from "./ArticleMetadata.entity";
import { ArticleImageEntity } from "./ArticleImage.entity";
import { PublishResultEntity } from "./PublishResult.entity";
import { PublishingQueueEntity } from "./PublishingQueue.entity";
import { ArticleProcessingLogEntity } from "./ArticleProcessingLog.entity";

export enum ArticleStatus {
  SCRAPED = "scraped",
  TRANSLATING = "translating", 
  TRANSLATED = "translated",
  PUBLISHING = "publishing",
  PUBLISHED = "published"
}

@Entity("articles")
@Index("idx_articles_source_url", ["sourceUrl"])
@Index("idx_articles_status", ["status"])
@Index("idx_articles_created_at", ["createdAt"])
export class ArticleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text", { nullable: false })
  title: string;

  @Column("text", { nullable: false })
  originalContent: string;

  @Column("text", { nullable: true })
  translatedContent: string;

  @Column("text", { nullable: false, unique: true })
  sourceUrl: string;

  @Column("text", { nullable: false })
  contentHash: string; // For deduplication

  @Column("text", { nullable: true })
  sourceLanguage: string;

  @Column("text", { nullable: true })
  targetLanguage: string;

  @Column("text", { nullable: false, default: ArticleStatus.SCRAPED })
  status: ArticleStatus;

  @CreateDateColumn()
  scrapedAt: Date;

  @Column("datetime", { nullable: true })
  translatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column("integer", { default: 1 })
  version: number; // For content versioning

  // Relationships
  @OneToMany(() => ArticleCodeBlockEntity, codeBlock => codeBlock.article, { cascade: true })
  codeBlocks: ArticleCodeBlockEntity[];

  @OneToMany(() => ArticleMetadataEntity, metadata => metadata.article, { cascade: true })
  metadata: ArticleMetadataEntity[];

  @OneToMany(() => ArticleImageEntity, image => image.article, { cascade: true })
  images: ArticleImageEntity[];

  @OneToMany(() => PublishResultEntity, publishResult => publishResult.article, { cascade: true })
  publishResults: PublishResultEntity[];

  @OneToMany(() => PublishingQueueEntity, queueItem => queueItem.article, { cascade: true })
  publishingQueue: PublishingQueueEntity[];

  @OneToMany(() => ArticleProcessingLogEntity, log => log.article, { cascade: true })
  processingLogs: ArticleProcessingLogEntity[];
} 