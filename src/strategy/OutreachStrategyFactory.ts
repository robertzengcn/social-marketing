import { OutreachStrategy, OutreachMethod, OutreachTarget, OutreachOptions } from './OutreachStrategy';
import { BaseOutreachStrategy } from './BaseOutreachStrategy';
import { EmailOutreachStrategy } from './EmailOutreachStrategy';
import { CommentOutreachStrategy } from './CommentOutreachStrategy';
import { DirectMessageOutreachStrategy } from './DirectMessageOutreachStrategy';

/**
 * Factory for creating appropriate outreach strategy
 */
export class OutreachStrategyFactory {
    private static strategies = new Map<string, new (options?: OutreachOptions) => BaseOutreachStrategy>([
        ['email', EmailOutreachStrategy],
        ['comment', CommentOutreachStrategy],
        ['direct-message', DirectMessageOutreachStrategy]
    ] as [OutreachMethod, new (options?: OutreachOptions) => BaseOutreachStrategy][]);

    /**
     * Create strategy instance by method
     */
    static createStrategy(
        method: OutreachMethod,
        options?: OutreachOptions
    ): BaseOutreachStrategy {
        const StrategyClass = this.strategies.get(method);
        if (!StrategyClass) {
            throw new Error(`Unknown outreach method: ${method}`);
        }
        return new StrategyClass(options);
    }

    /**
     * Auto-select strategy based on target
     */
    static selectStrategyForTarget(
        target: OutreachTarget,
        options?: OutreachOptions
    ): BaseOutreachStrategy {
        // Check each strategy's supported targets
        for (const [method, StrategyClass] of this.strategies) {
            const strategy = new StrategyClass(options);
            if (strategy.validateTarget(target)) {
                return strategy;
            }
        }

        // Default to comment strategy for websites
        if (target.type === 'website-url' || target.type === 'blog-post') {
            return new CommentOutreachStrategy(options);
        }

        throw new Error('No suitable strategy found for target');
    }

    /**
     * Register custom strategy
     */
    static registerStrategy(
        method: OutreachMethod,
        strategyClass: new (options?: OutreachOptions) => BaseOutreachStrategy
    ): void {
        this.strategies.set(method, strategyClass);
    }

    /**
     * Get all available strategies
     */
    static getAvailableMethods(): OutreachMethod[] {
        return Array.from(this.strategies.keys()) as OutreachMethod[];
    }
}
