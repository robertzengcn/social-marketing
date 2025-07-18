import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, Index } from "typeorm";
import { ArticleEntity } from "./Article.entity";
import { AccountCookiesEntity } from "./AccountCookies.entity";

@Entity("publish_results")
@Index("idx_publish_results_article", ["articleId"])
@Index("idx_publish_results_platform", ["platformName"])
@Index("idx_publish_results_success", ["success"])
export class PublishResultEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int", nullable: false })
  articleId: number;

  @Column({ type: "text", nullable: false })
  platformName: string;

  @Column({ type: "int", nullable: false })
  accountId: number;

  @Column({ type: "int", nullable: false })
  contentVersion: number; // Which version was published

  @Column({ type: "boolean", nullable: false })
  success: boolean;

  @Column({ type: "text", nullable: true })
  publishedUrl: string;

  @Column({ type: "text", nullable: true })
  errorMessage: string;

  @CreateDateColumn()
  publishedAt: Date;

  @Column({ type: "int", default: 0 })
  retryCount: number;

  // Relationships
  @ManyToOne(() => ArticleEntity, article => article.publishResults, { onDelete: "CASCADE" })
  @JoinColumn({ name: "articleId" })
  article: ArticleEntity;

  @ManyToOne(() => AccountCookiesEntity, { onDelete: "CASCADE" })
  @JoinColumn({ name: "accountId" })
  account: AccountCookiesEntity;
} 