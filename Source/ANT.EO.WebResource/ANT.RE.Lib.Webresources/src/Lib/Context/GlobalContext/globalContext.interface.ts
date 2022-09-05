export interface IGlobalContext {
    /* Returns information about the advanced configuration settings for the organization. */
    getAdvancedConfigSetting(setting: string): any

    /*  Returns the base URL that was used to access the application. */
    getClientUrl(): string;

    /* Returns the name of the current business app in model-driven apps. */
    getCurrentAppName(): Promise<{}>;

    /*  Returns the properties of the current business app in model-driven apps. */
    getCurrentAppProperties(): Promise<{}>;

    /*  Returns the URL of the current business app in model-driven apps. */
    getCurrentAppUrl(): string

    /*  Returns the version number of the model-driven apps instance. */
    getVersion(): string

    /*  Returns the relative URL with the caching token for the specified web resource. */
    getWebResourceUrl(webResourceName: string): string;

    /*  Returns information about the current user settings. */
    userSettings: any

    /* Returns information about the client. */
    client: any;

    /* Returns information about the current organization settings. */
    organizationSettings: any
}