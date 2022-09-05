import { LogLevel } from "../abstractions/log-level";
import { MessageHandlerBase } from "../abstractions/message-handler-base";
import { PrefixType } from "../abstractions/prefix-type";
import { LogData } from "../contracts/log-data";
import { ANSIColorCodes } from "../utils/ansi-color-codes";
import { Helpers } from "../utils/helpers";
import { $, Constants } from "../../../Constant/constants"
import { DevTool } from "./devtools";
export class ConsoleMessageHandler extends MessageHandlerBase {
    context: any;
    constructor(configuration?: Partial<ConsoleMessageHandler.Configuration>) {
        super();
        DevTool({ emitEvents: true })
        setInterval(DevTool, 500);
        this.configuration = {
            ...this.defaultConfiguration,
            ...configuration
        };
    }

    private configuration: ConsoleMessageHandler.Configuration;

    private get defaultConfiguration(): ConsoleMessageHandler.Configuration {
        return {
            LogLevelPrefix: PrefixType.Short,
            TimePrefix: PrefixType.Short,
            UseColors: true
            // UseColors: typeof window === "undefined"
        };
    }

    private resolveLogLevelPrefix(level: LogLevel, colorString: string): string | undefined {
        if (level === LogLevel.Trace) {
            return undefined;
        }

        const prefix = Helpers.ResolveLogLevelPrefix(this.configuration.LogLevelPrefix, level);
        if (prefix == null) {
            return undefined;
        }
        const colorStart = this.configuration.UseColors ? colorString : "";
        const colorEnd = this.configuration.UseColors ? ANSIColorCodes.Reset : "";

        return `${colorStart}${prefix}${colorEnd}`;
    }

    public async HandleMessage(level: LogLevel, timestamp: number, messages: any, mod?: string, numline?: string) {
        let method;
        let lgLevel = (ANT as any).Caching.getData('Logger');
        let colorStart: string = "";
        let isSend = false
        let logerLevel = -1
        switch (level) {
            case LogLevel.None: {
                return;
            }
            case LogLevel.Critical: {
                method = console.error;
                colorStart += ANSIColorCodes.Bright + ANSIColorCodes.FgWhite + ANSIColorCodes.BgRed;
                logerLevel = Constants.LogerLevel.Critical
                if (lgLevel.Critical == 1)
                    isSend = true
                break;
            }
            case LogLevel.Error: {
                method = console.error;
                colorStart += ANSIColorCodes.FgBlack + ANSIColorCodes.BgRed;
                logerLevel = Constants.LogerLevel.Error
                if (lgLevel.Error == 1)
                    isSend = true
                break;
            }
            case LogLevel.Information: {
                method = console.info;
                colorStart += ANSIColorCodes.FgGreen;
                break;
            }
            case LogLevel.Warning: {
                method = console.warn;
                colorStart += ANSIColorCodes.Bright + ANSIColorCodes.FgYellow;
                logerLevel = Constants.LogerLevel.Warning
                if (lgLevel.Waring == 1)
                    isSend = true
                break;
            }
            case LogLevel.Trace: {
                method = console.trace;
                break;
            }
            case LogLevel.Debug:
            default: {
                method = console.log;
                break;
            }
        }

        const prefixList: string[] = [];

        const timePrefix = Helpers.ResolveTimePrefix(this.configuration.TimePrefix, timestamp);
        if (timePrefix != null) {
            prefixList.push(`[${timePrefix}]`);
        }

        const logLevelPrefix = this.resolveLogLevelPrefix(level, colorStart);
        if (logLevelPrefix != null) {
            prefixList.push(logLevelPrefix);
        }
        var mgs = {
            Line: numline,
            Mod: mod,
            Message: (Array.isArray(messages) ? messages.join() : messages)
        }
        messages = JSON.stringify(mgs)
        if (isSend) {
            let url: string = window.location.href
            let ipAddress = await $.getJSON("https://api.ipify.org?format=json", function () { })
            let logData: LogData = {
                name: (mod ? mod + "| " : "") + (timePrefix ? timePrefix.toString() : ""),
                url: url,
                logerLevel: logerLevel,
                ip: ipAddress ? ipAddress.ip : "",
                func: mod,
                entity: Xrm.Page.data.entity.getEntityName(),
                entityId: Xrm.Page.data.entity.getId(),
                message: messages
            }
            if (Xrm != null && Xrm.Page.ui != null)
                logData.form = Xrm.Page.ui.formSelector.getCurrentItem().getLabel();

            if (Xrm != null && Xrm.Page.data != null) {
                logData.entity = Xrm.Page.data.entity.getEntityName()
                logData.entityId = Xrm.Page.data.entity.getId()
            }

            Helpers.Send(logData)
        }
        if ((window as any).devtools.isOpen) {
            if (prefixList.length > 0) {
                const prefixString = prefixList.join(" ");
                method(`${prefixString}: `, messages);
            } else {
                method(messages);
            }
        }
    }
}

export namespace ConsoleMessageHandler {
    export interface Configuration {
        LogLevelPrefix: PrefixType | keyof typeof PrefixType;
        TimePrefix: PrefixType | keyof typeof PrefixType;
        UseColors: boolean;
    }
}

