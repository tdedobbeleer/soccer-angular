/**
 * Weather API
 */
/* tslint:disable:no-unused-variable member-ordering */
import {Injectable} from "@angular/core";
import {Http, Headers, RequestMethod, RequestOptions, RequestOptionsArgs, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";
import * as models from "../model/models";
import {environment} from "../../../../environments/environment";


@Injectable()
export class FootballDatarestcontrollerApi {

    protected basePath = 'http://api.football-data.org/v1';
    public defaultHeaders: Headers = new Headers({
        'X-Auth-Token': environment.football_data_api_key,
    });

    constructor(protected http: Http) {
    }

    /**
     * Get table
     *
     */
    public getLeagueTable(id: number, extraHttpRequestParams?: any): Observable<models.ForecastDTO> {
        return this.getLeagueTableWithHttpInfo(id, extraHttpRequestParams)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json() || {};
                }
            });
    }

    /**
     * Get table with http info
     *
     */
    public getLeagueTableWithHttpInfo(id: number, extraHttpRequestParams?: any): Observable<Response> {
        let path = this.basePath + 'competitions/' + id + '/leagueTable';

        let headers = new Headers(this.defaultHeaders.toJSON());

        let requestOptions: RequestOptionsArgs = new RequestOptions({
            method: RequestMethod.Get,
            headers: headers,
        });

        if (extraHttpRequestParams) {
            requestOptions = (<any>Object).assign(requestOptions, extraHttpRequestParams);
        }

        return this.http.request(path, requestOptions);
    }

}
