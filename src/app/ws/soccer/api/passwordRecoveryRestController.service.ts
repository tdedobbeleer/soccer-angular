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
import {PasswordRecoveryDTO} from '../model/passwordRecoveryDTO';
import {ResponseEntity} from '../model/responseEntity';

import {BASE_PATH} from '../variables';
import {Configuration} from '../configuration';


@Injectable()
export class PasswordRecoveryRestControllerService {

    protected basePath = 'https://localhost:8080';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
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
     * Get a password recovery code
     * 
     * @param captchaResponse captchaResponse
     * @param passwordRecoveryDTO passwordRecoveryDTO
     * @param iSO3Country 
     * @param iSO3Language 
     * @param country 
     * @param displayCountry 
     * @param displayLanguage 
     * @param displayName 
     * @param displayScript 
     * @param displayVariant 
     * @param language 
     * @param script 
     * @param unicodeLocaleAttributes 
     * @param unicodeLocaleKeys 
     * @param variant 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public forgotPassword(captchaResponse: string, passwordRecoveryDTO: PasswordRecoveryDTO, iSO3Country?: string, iSO3Language?: string, country?: string, displayCountry?: string, displayLanguage?: string, displayName?: string, displayScript?: string, displayVariant?: string, language?: string, script?: string, unicodeLocaleAttributes?: Array<string>, unicodeLocaleKeys?: Array<string>, variant?: string, observe?: 'body', reportProgress?: boolean): Observable<ResponseEntity>;
    public forgotPassword(captchaResponse: string, passwordRecoveryDTO: PasswordRecoveryDTO, iSO3Country?: string, iSO3Language?: string, country?: string, displayCountry?: string, displayLanguage?: string, displayName?: string, displayScript?: string, displayVariant?: string, language?: string, script?: string, unicodeLocaleAttributes?: Array<string>, unicodeLocaleKeys?: Array<string>, variant?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ResponseEntity>>;
    public forgotPassword(captchaResponse: string, passwordRecoveryDTO: PasswordRecoveryDTO, iSO3Country?: string, iSO3Language?: string, country?: string, displayCountry?: string, displayLanguage?: string, displayName?: string, displayScript?: string, displayVariant?: string, language?: string, script?: string, unicodeLocaleAttributes?: Array<string>, unicodeLocaleKeys?: Array<string>, variant?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ResponseEntity>>;
    public forgotPassword(captchaResponse: string, passwordRecoveryDTO: PasswordRecoveryDTO, iSO3Country?: string, iSO3Language?: string, country?: string, displayCountry?: string, displayLanguage?: string, displayName?: string, displayScript?: string, displayVariant?: string, language?: string, script?: string, unicodeLocaleAttributes?: Array<string>, unicodeLocaleKeys?: Array<string>, variant?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (captchaResponse === null || captchaResponse === undefined) {
            throw new Error('Required parameter captchaResponse was null or undefined when calling forgotPassword.');
        }
        if (passwordRecoveryDTO === null || passwordRecoveryDTO === undefined) {
            throw new Error('Required parameter passwordRecoveryDTO was null or undefined when calling forgotPassword.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (iSO3Country !== undefined) {
            queryParameters = queryParameters.set('ISO3Country', <any>iSO3Country);
        }
        if (iSO3Language !== undefined) {
            queryParameters = queryParameters.set('ISO3Language', <any>iSO3Language);
        }
        if (captchaResponse !== undefined) {
            queryParameters = queryParameters.set('captchaResponse', <any>captchaResponse);
        }
        if (country !== undefined) {
            queryParameters = queryParameters.set('country', <any>country);
        }
        if (displayCountry !== undefined) {
            queryParameters = queryParameters.set('displayCountry', <any>displayCountry);
        }
        if (displayLanguage !== undefined) {
            queryParameters = queryParameters.set('displayLanguage', <any>displayLanguage);
        }
        if (displayName !== undefined) {
            queryParameters = queryParameters.set('displayName', <any>displayName);
        }
        if (displayScript !== undefined) {
            queryParameters = queryParameters.set('displayScript', <any>displayScript);
        }
        if (displayVariant !== undefined) {
            queryParameters = queryParameters.set('displayVariant', <any>displayVariant);
        }
        if (language !== undefined) {
            queryParameters = queryParameters.set('language', <any>language);
        }
        if (script !== undefined) {
            queryParameters = queryParameters.set('script', <any>script);
        }
        if (unicodeLocaleAttributes) {
            unicodeLocaleAttributes.forEach((element) => {
                queryParameters = queryParameters.append('unicodeLocaleAttributes', <any>element);
            })
        }
        if (unicodeLocaleKeys) {
            unicodeLocaleKeys.forEach((element) => {
                queryParameters = queryParameters.append('unicodeLocaleKeys', <any>element);
            })
        }
        if (variant !== undefined) {
            queryParameters = queryParameters.set('variant', <any>variant);
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
        let httpContentTypeSelected:string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set("Content-Type", httpContentTypeSelected);
        }

        return this.httpClient.post<ResponseEntity>(`${this.basePath}/api/v1/accounts/password/recovery`,
            passwordRecoveryDTO,
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
     * Set a new password using recovery code
     * 
     * @param passwordRecoveryDTO passwordRecoveryDTO
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public useRecoveryCode(passwordRecoveryDTO: PasswordRecoveryDTO, observe?: 'body', reportProgress?: boolean): Observable<ResponseEntity>;
    public useRecoveryCode(passwordRecoveryDTO: PasswordRecoveryDTO, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ResponseEntity>>;
    public useRecoveryCode(passwordRecoveryDTO: PasswordRecoveryDTO, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ResponseEntity>>;
    public useRecoveryCode(passwordRecoveryDTO: PasswordRecoveryDTO, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (passwordRecoveryDTO === null || passwordRecoveryDTO === undefined) {
            throw new Error('Required parameter passwordRecoveryDTO was null or undefined when calling useRecoveryCode.');
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
        let httpContentTypeSelected:string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set("Content-Type", httpContentTypeSelected);
        }

        return this.httpClient.put<ResponseEntity>(`${this.basePath}/api/v1/accounts/password/recovery`,
            passwordRecoveryDTO,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
