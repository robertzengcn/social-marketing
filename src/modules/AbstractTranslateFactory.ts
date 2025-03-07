import {LlmImpl} from '@/modules/interface/LlmImpl';
import {TraditionalTranslateImpl} from '@/modules/interface/TraditionalTranslateImpl';
export abstract class AbstractTranslateFactory{
    public abstract getLlmTool(name: string): LlmImpl | undefined;
    public abstract getTraditionalTool(name: string): TraditionalTranslateImpl | undefined;
}