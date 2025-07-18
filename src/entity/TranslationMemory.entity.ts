import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index } from "typeorm";

@Entity("translation_memory")
@Index("idx_translation_memory_lookup", ["sourceLanguage", "targetLanguage"])
@Index("idx_translation_memory_source_text", ["sourceText"])
export class TranslationMemoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text", nullable: false })
  sourceText: string;

  @Column({ type: "text", nullable: false })
  translatedText: string;

  @Column({ type: "text", nullable: false })
  sourceLanguage: string;

  @Column({ type: "text", nullable: false })
  targetLanguage: string;

  @Column({ type: "real", nullable: true })
  qualityScore: number;

  @Column({ type: "int", default: 1 })
  usageCount: number;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  lastUsedAt: Date;

  @Column({ type: "text", nullable: true })
  toolUsed: string; // Which translation tool was used

  // Unique constraint on source text and language pair
  @Index("idx_translation_memory_unique", { unique: true })
  @Column({ type: "text", nullable: false })
  uniqueKey: string; // Combination of sourceText, sourceLanguage, targetLanguage
} 