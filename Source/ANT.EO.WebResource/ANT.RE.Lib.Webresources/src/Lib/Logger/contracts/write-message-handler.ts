import { MessageHandlerBase } from "../abstractions/message-handler-base";
import { LogLevelData } from "./log-level-data";

export interface WriteMessageHandler extends LogLevelData {
    Handler: MessageHandlerBase;
}

export interface WriteMessageHandlerBuilder extends Partial<LogLevelData> {
    Handler: MessageHandlerBase;
}
