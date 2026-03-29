import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import AuditableEntity from "@/entity/Auditable.entity";
import { OutContactEntity } from "./OutContact.entity";
import { ScrapingLogEntity } from "./ScrapingLog.entity";
import { ScrapingTaskStatus } from "@/entityTypes/outreach.enums";
import { validateTargetUrls } from "@/utility/validation";

@Entity("outreach_task")
export class OutreachTaskEntity extends AuditableEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  name: string;

  @Column("text", { nullable: true })
  description: string;

  @Column("integer", { default: ScrapingTaskStatus.PENDING })
  status: ScrapingTaskStatus;

  @Column("text")
  target_urls: string; // JSON: ["https://example.com", "https://site2.com"]

  @Column("integer", { nullable: true })
  total_contacts: number;

  @Column("integer", { nullable: true })
  account_id: number;

  @Column("text", { nullable: true })
  error_log: string;

  @Column("text", { nullable: true })
  runtime_log: string;

  @OneToMany(() => OutContactEntity, (contact) => contact.task, {
    onDelete: "CASCADE",
  })
  contacts: OutContactEntity[];

  @OneToMany(() => ScrapingLogEntity, (log) => log.task, {
    onDelete: "CASCADE",
  })
  scraping_logs: ScrapingLogEntity[];

  /**
   * Validate and parse target URLs from JSON string
   * @returns Array of validated URLs or empty array if invalid
   */
  getParsedTargetUrls(): string[] {
    return validateTargetUrls(this.target_urls);
  }

  /**
   * Set target URLs from array with validation
   * @param urls - Array of URLs to set
   * @returns true if validation passed, false otherwise
   */
  setTargetUrls(urls: string[]): boolean {
    try {
      // Validate all URLs first
      const validUrls = urls.filter((url) => {
        try {
          new URL(url);
          return true;
        } catch {
          return false;
        }
      });

      if (validUrls.length === 0) {
        return false;
      }

      // Store as JSON string
      this.target_urls = JSON.stringify(validUrls);
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Get count of target URLs
   */
  getTargetUrlsCount(): number {
    return this.getParsedTargetUrls().length;
  }
}
