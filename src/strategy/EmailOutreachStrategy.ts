import { BaseOutreachStrategy } from './BaseOutreachStrategy';
import { OutreachTarget, OutreachOptions, OutreachResult, OutreachMethod } from './OutreachStrategy';

/**
 * Email outreach strategy implementation
 * Sends personalized emails to contacts
 */
export class EmailOutreachStrategy extends BaseOutreachStrategy {
    getName(): OutreachMethod {
        return 'email';
    }

    validateTarget(target: OutreachTarget): boolean {
        return target.type === 'email-address' && this.isValidEmail(target.identifier);
    }

    getSupportedTargets(): string[] {
        return ['email-address'];
    }

    protected async authenticate(credentials: any): Promise<boolean> {
        // Uses existing email infrastructure from src/buckEmail.ts
        // Email credentials already configured in app
        return true;
    }

    async performSend(target: OutreachTarget, message: string): Promise<OutreachResult> {
        try {
            // Use existing email sending infrastructure
            const emailService = require('../modules/email').EmailService;

            await emailService.send({
                to: target.identifier,
                subject: this.extractSubject(message),
                body: message
            });

            return {
                success: true,
                target: target.identifier,
                method: 'email',
                message,
                timestamp: Date.now()
            };

        } catch (error) {
            throw new Error(`Email send failed: ${(error as Error).message}`);
        }
    }

    private isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    private extractSubject(message: string): string {
        // Extract subject from message or use default
        const lines = message.split('\n');
        return lines[0].substring(0, 100);
    }
}
