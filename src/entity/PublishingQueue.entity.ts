import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, Index } from "typeorm";
import { ArticleEntity } from "./Article.entity";
import { AccountCookiesEntity } from "./AccountCookies.entity";

export enum PublishingQueueStatus {
  PENDING = "pending",
  PROCESSING = "processing",
  COMPLETED = "completed",
  FAILED = "failed"
}

@Entity("publishing_queue")
@Index("idx_publishing_queue_scheduled", ["scheduledAt", "status"])
@Index("idx_publishing_queue_article", ["articleId"])
@Index("idx_publishing_queue_platform", ["platformName"])
export class PublishingQueueEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int", nullable: false })
  articleId: number;

  @Column({ type: "text", nullable: false })
  platformName: string;

  @Column({ type: "int", nullable: false })
  accountId: number;

  @Column({ type: "datetime", nullable: false })
  scheduledAt: Date;

  @Column({ 
    type: "text", 
    nullable: false, 
    default: PublishingQueueStatus.PENDING 
  })
  status: PublishingQueueStatus;

  @Column({ type: "int", default: 0 })
  priority: number;

  @CreateDateColumn()
  createdAt: Date;

  // Relationships
  @ManyToOne(() => ArticleEntity, article => article.publishingQueue, { onDelete: "CASCADE" })
  @JoinColumn({ name: "articleId" })
  article: ArticleEntity;

  @ManyToOne(() => AccountCookiesEntity, { onDelete: "CASCADE" })
  @JoinColumn({ name: "accountId" })
  account: AccountCookiesEntity;
} 