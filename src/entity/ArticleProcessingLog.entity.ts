import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, Index } from "typeorm";
import { ArticleEntity } from "./Article.entity";

export enum ProcessingOperation {
  SCRAPE = "scrape",
  TRANSLATE = "translate",
  PUBLISH = "publish"
}

export enum ProcessingStatus {
  SUCCESS = "success",
  ERROR = "error",
  WARNING = "warning"
}

@Entity("article_processing_logs")
@Index("idx_article_processing_logs_article", ["articleId"])
@Index("idx_article_processing_logs_operation", ["operation"])
@Index("idx_article_processing_logs_status", ["status"])
@Index("idx_article_processing_logs_created", ["createdAt"])
export class ArticleProcessingLogEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int", nullable: false })
  articleId: number;

  @Column({ 
    type: "text", 
    nullable: false 
  })
  operation: ProcessingOperation;

  @Column({ 
    type: "text", 
    nullable: false 
  })
  status: ProcessingStatus;

  @Column({ type: "text", nullable: true })
  message: string;

  @Column({ type: "text", nullable: true })
  details: string; // JSON string for additional data

  @CreateDateColumn()
  createdAt: Date;

  // Relationship
  @ManyToOne(() => ArticleEntity, article => article.processingLogs, { onDelete: "CASCADE" })
  @JoinColumn({ name: "articleId" })
  article: ArticleEntity;
} 