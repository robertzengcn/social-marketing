import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, Index } from "typeorm";
import { ArticleEntity } from "./Article.entity";

@Entity("article_images")
@Index("idx_article_images_article_id", ["articleId"])
export class ArticleImageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int", nullable: false })
  articleId: number;

  @Column({ type: "text", nullable: false })
  originalUrl: string;

  @Column({ type: "text", nullable: false })
  localPath: string;

  @Column({ type: "text", nullable: false })
  fileName: string;

  @Column({ type: "int", nullable: true })
  fileSize: number;

  @Column({ type: "text", nullable: true })
  mimeType: string;

  @CreateDateColumn()
  downloadedAt: Date;

  // Relationship
  @ManyToOne(() => ArticleEntity, article => article.images, { onDelete: "CASCADE" })
  @JoinColumn({ name: "articleId" })
  article: ArticleEntity;
} 