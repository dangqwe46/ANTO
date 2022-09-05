import { LogLevel } from "./abstractions/log-level";
import { LoggerBuilder } from "./builders/logger-builder";
import { ConsoleMessageHandler } from "./handlers/console-message-handler";

export const logger = new LoggerBuilder({
    DefaultLogLevel: {
        LogLevel: LogLevel.Trace,
        LogLevelIsBitMask: false,
    },
    // Prefix: "ANT",
    WriteMessageHandlers: [{
        Handler: new ConsoleMessageHandler(),
        LogLevel: LogLevel.Critical | LogLevel.Debug | LogLevel.Information | LogLevel.Warning | LogLevel.Error | LogLevel.Trace,
        LogLevelIsBitMask: true
    }]
});

export const LogerLevel = LogLevel

