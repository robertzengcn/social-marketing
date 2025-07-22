import { ArticleModel } from '@/model/Article.model';
import { ArticleEntity, ArticleStatus } from '@/entity/Article.entity';

export default class ArticleModule {
  private articleModel: ArticleModel;

  constructor(dbpath: string) {
    this.articleModel = new ArticleModel(dbpath);
  }

  async create(article: Partial<ArticleEntity>): Promise<number> {
    try {
      return await this.articleModel.saveArticle(article);
    } catch (error) {
      console.error('Error creating article:', error);
      throw error;
    }
  }

  async read(id: number): Promise<ArticleEntity | null> {
    try {
      return await this.articleModel.getArticleById(id);
    } catch (error) {
      console.error('Error reading article:', error);
      throw error;
    }
  }

  async update(id: number, article: Partial<ArticleEntity>): Promise<boolean> {
    try {
      // Only update fields provided in article
      return await this.articleModel.saveArticle({ ...article, id }) > 0;
    } catch (error) {
      console.error('Error updating article:', error);
      throw error;
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      return await this.articleModel.deleteArticle(id);
    } catch (error) {
      console.error('Error deleting article:', error);
      throw error;
    }
  }

  async getArticlesByStatus(status: ArticleStatus, limit = 50, offset = 0) {
    try {
      return await this.articleModel.getArticlesByStatus(status, limit, offset);
    } catch (error) {
      console.error('Error getting articles by status:', error);
      throw error;
    }
  }

  async getAllArticles(limit = 50, offset = 0) {
    try {
      return await this.articleModel.getAllArticles(limit, offset);
    } catch (error) {
      console.error('Error getting all articles:', error);
      throw error;
    }
  }

  async searchArticles(searchTerm: string, limit = 50, offset = 0) {
    try {
      return await this.articleModel.searchArticles(searchTerm, limit, offset);
    } catch (error) {
      console.error('Error searching articles:', error);
      throw error;
    }
  }

  async updateArticleStatus(id: number, status: ArticleStatus): Promise<boolean> {
    try {
      return await this.articleModel.updateArticleStatus(id, status);
    } catch (error) {
      console.error('Error updating article status:', error);
      throw error;
    }
  }

  async updateTranslatedContent(id: number, translatedContent: string, targetLanguage: string): Promise<boolean> {
    try {
      return await this.articleModel.updateTranslatedContent(id, translatedContent, targetLanguage);
    } catch (error) {
      console.error('Error updating translated content:', error);
      throw error;
    }
  }

  async getArticleStatistics() {
    try {
      return await this.articleModel.getArticleStatistics();
    } catch (error) {
      console.error('Error getting article statistics:', error);
      throw error;
    }
  }

  async getArticlesByDateRange(startDate: Date, endDate: Date, limit = 50, offset = 0) {
    try {
      return await this.articleModel.getArticlesByDateRange(startDate, endDate, limit, offset);
    } catch (error) {
      console.error('Error getting articles by date range:', error);
      throw error;
    }
  }

  async getArticlesByLanguage(language: string, limit = 50, offset = 0) {
    try {
      return await this.articleModel.getArticlesByLanguage(language, limit, offset);
    } catch (error) {
      console.error('Error getting articles by language:', error);
      throw error;
    }
  }
} 