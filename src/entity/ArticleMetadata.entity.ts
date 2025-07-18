import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Index } from "typeorm";
import { ArticleEntity } from "./Article.entity";

@Entity("article_metadata")
@Index("idx_article_metadata_article_id", ["articleId"])
@Index("idx_article_metadata_key", ["key"])
export class ArticleMetadataEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int", nullable: false })
  articleId: number;

  @Column({ type: "text", nullable: false })
  key: string;

  @Column({ type: "text", nullable: true })
  value: string;

  @Column({ type: "int", default: 1 })
  version: number;

  // Relationship
  @ManyToOne(() => ArticleEntity, article => article.metadata, { onDelete: "CASCADE" })
  @JoinColumn({ name: "articleId" })
  article: ArticleEntity;
} 