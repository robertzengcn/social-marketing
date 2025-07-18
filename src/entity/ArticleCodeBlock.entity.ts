import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Index } from "typeorm";
import { ArticleEntity } from "./Article.entity";

@Entity("article_code_blocks")
@Index("idx_article_code_blocks_article_id", ["articleId"])
export class ArticleCodeBlockEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int", nullable: false })
  articleId: number;

  @Column({ type: "text", nullable: true })
  language: string;

  @Column({ type: "text", nullable: false })
  code: string;

  @Column({ type: "int", nullable: false })
  position: number; // Position in original content

  @Column({ type: "text", nullable: false })
  blockId: string; // Unique identifier for the code block

  @Column({ type: "int", default: 1 })
  version: number;

  // Relationship
  @ManyToOne(() => ArticleEntity, article => article.codeBlocks, { onDelete: "CASCADE" })
  @JoinColumn({ name: "articleId" })
  article: ArticleEntity;
} 