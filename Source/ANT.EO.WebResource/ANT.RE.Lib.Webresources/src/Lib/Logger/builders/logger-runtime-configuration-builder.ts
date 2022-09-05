import { LoggerConfiguration } from "../contracts/logger-configuration";
import { LoggerConfigurationBuilder } from "./logger-configuration-builder";

export class LoggerRuntimeConfigurationBuilder {
    constructor(protected Configuration: LoggerConfiguration = new LoggerConfigurationBuilder().Build()) {
    }

    /**
     * Update existing logger configuration.
     *
     * @param updater Updater handler which return new configuration.
     * @param setInitialConfigurationFromCurrent [default=true]
     * @param setInitialConfigurationFromCurrent Set builder initial configuration from the current logger configuration.
     */
    public UpdateConfiguration(
        updater: LoggerRuntimeConfigurationBuilder.ConfigurationUpdater,
        setInitialConfigurationFromCurrent: boolean = true
    ): this {
        this.Configuration = updater(new LoggerConfigurationBuilder(setInitialConfigurationFromCurrent ? this.Configuration : undefined));

        return this;
    }
}

export namespace LoggerRuntimeConfigurationBuilder {
    export type ConfigurationUpdater = (builder: LoggerConfigurationBuilder) => LoggerConfiguration;
}
