import { LogLevel } from "../abstractions/log-level";
import { Helpers } from "../utils/helpers";
import { LoggerRuntimeConfigurationBuilder } from "./logger-runtime-configuration-builder";

export class LoggerBuilder extends LoggerRuntimeConfigurationBuilder {

    /**
     * Writes a log entries with specified log level.
     *
     * @param level Entries will be written on this level.
     * @param messages Messages to be written.
     * @param module function error.
     * @param numline Line of code error.
     */
    public Log = (level: LogLevel, messages: any[], module?: string, numline?: number): number => this.log(level, messages, module, numline);

    /**
     * Write a log entries with debug log level.
     *
     * @param messages Messages to be written.
     */
    public Debug = (messages: any[], module?: string, numline?: number): number => this.log(LogLevel.Debug, messages, module, numline);

    /**
     * Write a log entries with information log level.
     *
     * @param messages Messages to be written.
     */
    public Info = (messages: any[], module?: string, numline?: number): number => this.log(LogLevel.Information, messages, module, numline);

    /**
     * Write a log entries with warning log level.
     *
     * @param messages Messages to be written.
     */
    public Warn = (messages: any[], module?: string, numline?: number): number => this.log(LogLevel.Warning, messages, module, numline);

    /**
     * Write a log entries with error log level.
     *
     * @param messages Messages to be written.
     */
    public Error = (messages: any[], module?: string, numline?: number): number => this.log(LogLevel.Error, messages, module, numline);

    /**
     * Write a log entries with critical log level.
     *
     * @param messages Messages to be written.
     */
    public Critical = (messages: any[], module?: string, numline?: number): number => this.log(LogLevel.Critical, messages, module, numline);

    /**
     * Write a log entries with trace log level.
     *
     * @param messages Messages to be written.
     */
    public Trace = (messages: any[]): number => this.log(LogLevel.Trace, messages);

    private log(level: LogLevel, messages: any[], module?: string, numline?: number): number {
        const timestamp = Date.now();
        if (this.Configuration.Prefix) {
            if (Array.isArray(messages))
                messages = [this.Configuration.Prefix].concat(...messages);
            else
                messages = [this.Configuration.Prefix].concat(messages);
        }

        for (const handlerInstance of this.Configuration.WriteMessageHandlers) {
            if (Helpers.IsLogLevelEnabled(handlerInstance.LogLevel, handlerInstance.LogLevelIsBitMask, level)) {
                handlerInstance.Handler.HandleMessage(level, timestamp, messages, module, numline);
            }
        }

        return timestamp;
    }
}
