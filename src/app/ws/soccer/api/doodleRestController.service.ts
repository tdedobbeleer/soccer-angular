/**
 * Soccer API
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 1.0
 * Contact: voetbalsvk@gmail.com
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
/* tslint:disable:no-unused-variable member-ordering */

import {Inject, Injectable, Optional} from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {CustomHttpUrlEncodingCodec} from '../encoder';

import {Observable} from 'rxjs/Observable';
import {MatchDoodleDTO} from '../model/matchDoodleDTO';
import {PageDTOMatchDoodleDTO} from '../model/pageDTOMatchDoodleDTO';
import {PresenceDTO} from '../model/presenceDTO';

import {BASE_PATH} from '../variables';
import {Configuration} from '../configuration';


@Injectable()
export class DoodleRestControllerService {

    protected basePath = 'https://localhost:8080';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient, @Optional() @Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
            this.basePath = basePath || configuration.basePath || this.basePath;
        }
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (let consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }


    /**
     * Change presence
     * 
     * @param id id
     * @param accountId accountId
     * @param force force
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public changePresence(id: number, accountId: number, force?: boolean, observe?: 'body', reportProgress?: boolean): Observable<PresenceDTO>;
    public changePresence(id: number, accountId: number, force?: boolean, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<PresenceDTO>>;
    public changePresence(id: number, accountId: number, force?: boolean, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<PresenceDTO>>;
    public changePresence(id: number, accountId: number, force?: boolean, observe: any = 'body', reportProgress: boolean = false): Observable<any> {
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling changePresence.');
        }
        if (accountId === null || accountId === undefined) {
            throw new Error('Required parameter accountId was null or undefined when calling changePresence.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (force !== undefined) {
            queryParameters = queryParameters.set('force', <any>force);
        }

        let headers = this.defaultHeaders;

        // authentication (token) required
        if (this.configuration.apiKeys["X-Auth-Token"]) {
            headers = headers.set('X-Auth-Token', this.configuration.apiKeys["X-Auth-Token"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
            'application/json'
        ];

        return this.httpClient.put<PresenceDTO>(`${this.basePath}/api/v1/doodle/match/${encodeURIComponent(String(id))}/presence/${encodeURIComponent(String(accountId))}`,
            null,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get matchdoodles
     * 
     * @param id id
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public matchDoodle(id: number, observe?: 'body', reportProgress?: boolean): Observable<MatchDoodleDTO>;
    public matchDoodle(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<MatchDoodleDTO>>;
    public matchDoodle(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<MatchDoodleDTO>>;
    public matchDoodle(id: number, observe: any = 'body', reportProgress: boolean = false): Observable<any> {
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling matchDoodle.');
        }

        let headers = this.defaultHeaders;

        // authentication (token) required
        if (this.configuration.apiKeys["X-Auth-Token"]) {
            headers = headers.set('X-Auth-Token', this.configuration.apiKeys["X-Auth-Token"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
            'application/json'
        ];

        return this.httpClient.get<MatchDoodleDTO>(`${this.basePath}/api/v1/matchDoodle/${encodeURIComponent(String(id))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get matchdoodles
     * 
     * @param page page
     * @param size size
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public matchDoodlesPage(page: number, size?: number, observe?: 'body', reportProgress?: boolean): Observable<PageDTOMatchDoodleDTO>;
    public matchDoodlesPage(page: number, size?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<PageDTOMatchDoodleDTO>>;
    public matchDoodlesPage(page: number, size?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<PageDTOMatchDoodleDTO>>;
    public matchDoodlesPage(page: number, size?: number, observe: any = 'body', reportProgress: boolean = false): Observable<any> {
        if (page === null || page === undefined) {
            throw new Error('Required parameter page was null or undefined when calling matchDoodlesPage.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (page !== undefined) {
            queryParameters = queryParameters.set('page', <any>page);
        }
        if (size !== undefined) {
            queryParameters = queryParameters.set('size', <any>size);
        }

        let headers = this.defaultHeaders;

        // authentication (token) required
        if (this.configuration.apiKeys["X-Auth-Token"]) {
            headers = headers.set('X-Auth-Token', this.configuration.apiKeys["X-Auth-Token"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
            'application/json'
        ];

        return this.httpClient.get<PageDTOMatchDoodleDTO>(`${this.basePath}/api/v1/matchDoodle`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
