export interface ForecastApiConfigurationParameters {
    accessToken?: string;
    basePath?: string;
    country?: string;
}

export class ForecastApiConfiguration {
    accessToken?: string;
    basePath?: string;
    country?: string;

    constructor(configurationParameters: ForecastApiConfigurationParameters = {}) {
        this.accessToken = configurationParameters.accessToken;
        this.basePath = configurationParameters.basePath;
        this.country = configurationParameters.country;
    }
}