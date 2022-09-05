import { LogLevel } from "./log-level";

export abstract class MessageHandlerBase {
    public abstract HandleMessage(level: LogLevel, timestamp: number, messages: any[], module?: string, trace?: any, numline?: number): void;
}
