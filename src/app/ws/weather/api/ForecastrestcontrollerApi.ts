/**
 * Weather API
 */
/* tslint:disable:no-unused-variable member-ordering */
import {Injectable} from "@angular/core";
import {
    Http,
    Headers,
    URLSearchParams,
    RequestMethod,
    RequestOptions,
    RequestOptionsArgs,
    Response
} from "@angular/http";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";
import * as models from "../model/models";


@Injectable()
export class ForecastrestcontrollerApi {

    protected basePath = 'http://api.openweathermap.org';
    private apiKey = 'ed947b1f42105d993e46d24c3d770be2';
    public defaultHeaders: Headers = new Headers();

    constructor(protected http: Http) {
    }

    /**
     * Get all seasons
     *
     */
    public getForecast(lang: any, zip: any, extraHttpRequestParams?: any): Observable<models.ForecastDTO> {
        return this.getForecastWithHttpInfo(zip, lang, extraHttpRequestParams)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json() || {};
                }
            });
    }

    /**
     * Get forecast for
     *
     */
    public getForecastWithHttpInfo(zip: any, lang: any, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/data/2.5/forecast';

        let queryParameters = new URLSearchParams();
        queryParameters.append("lang", lang);
        queryParameters.append("zip", zip + ",be");
        queryParameters.append("appid", this.apiKey);
        queryParameters.append("units", "metric");
        let headers = new Headers(this.defaultHeaders.toJSON());

        let requestOptions: RequestOptionsArgs = new RequestOptions({
            method: RequestMethod.Get,
            headers: headers,
            search: queryParameters,
        });
        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = (<any>Object).assign(requestOptions, extraHttpRequestParams);
        }

        return this.http.request(path, requestOptions);
    }

}
