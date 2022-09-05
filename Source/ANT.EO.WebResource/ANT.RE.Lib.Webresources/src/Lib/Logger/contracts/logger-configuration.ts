import { LogLevelData } from "./log-level-data";
import { WriteMessageHandler, WriteMessageHandlerBuilder } from "./write-message-handler";

export interface LoggerConfigurationBase {
    Prefix?: string;
    DefaultLogLevel: LogLevelData;
}

export interface LoggerConfiguration extends LoggerConfigurationBase {
    WriteMessageHandlers: WriteMessageHandler[];
}

export interface InitialLoggerConfiguration extends LoggerConfigurationBase {
    WriteMessageHandlers: Array<WriteMessageHandler | WriteMessageHandlerBuilder>;
}
