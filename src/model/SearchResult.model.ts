import { BaseDb } from "@/model/Basedb";
import { Repository, In } from "typeorm";
import { SearchResultEntity } from "@/entity/SearchResult.entity";
import { SearchResEntity } from "@/entityTypes/scrapeType";

export class SearchResultModel extends BaseDb {
    private repository: Repository<SearchResultEntity>;

    constructor(filepath: string) {
        super(filepath);
        this.repository = this.sqliteDb.connection.getRepository(SearchResultEntity);
    }

    /**
     * Save search result
     */
    async saveResult(data: SearchResEntity): Promise<number> {
        const resultEntity = new SearchResultEntity();
        resultEntity.task_id = data.keyword_id;
        resultEntity.title = data.title ?? "";
        resultEntity.link = data.link;
        resultEntity.snippet = data.snippet ?? "";
        resultEntity.domain = data.visible_link ?? "";
        resultEntity.record_time = new Date().toISOString();

        const savedResult = await this.repository.save(resultEntity);
        return savedResult.id;
    }

    /**
     * List search results with pagination
     */
    async listSearchresult(keywords: number[], page: number, size: number): Promise<SearchResEntity[]> {
        const results = await this.repository.find({
            where: { task_id: In(keywords) },
            skip: page,
            take: size
        });

        return results.map(result => ({
            keyword_id: result.task_id,
            link: result.link,
            title: result.title,
            snippet: result.snippet,
            visible_link: result.domain
        }));
    }

    /**
     * Count search results by keyword ids
     */
    async countSearchResult(keywords: number[]): Promise<number> {
        return await this.repository.count({
            where: { task_id: In(keywords) }
        });
    }

    /**
     * Truncate the database table
     */
    async truncatedb(): Promise<void> {
        await this.repository.clear();
    }
} 