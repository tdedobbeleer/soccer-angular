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
import {HttpClient, HttpEvent, HttpHeaders, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';

import {CommentDTO} from '../model/commentDTO';
import {ResponseEntity} from '../model/responseEntity';

import {BASE_PATH} from '../variables';
import {Configuration} from '../configuration';


@Injectable()
export class CommentsRestControllerService {

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
     * Get news
     * 
     * @param commentId commentId
     * @param id id
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public deleteComment(commentId: number, id: number, observe?: 'body', reportProgress?: boolean): Observable<ResponseEntity>;
    public deleteComment(commentId: number, id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ResponseEntity>>;
    public deleteComment(commentId: number, id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ResponseEntity>>;
    public deleteComment(commentId: number, id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (commentId === null || commentId === undefined) {
            throw new Error('Required parameter commentId was null or undefined when calling deleteComment.');
        }
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling deleteComment.');
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
        ];

        return this.httpClient.delete<ResponseEntity>(`${this.basePath}/api/v1/news/${encodeURIComponent(String(id))}/comment/${encodeURIComponent(String(commentId))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get news
     * 
     * @param commentDTO commentDTO
     * @param id id
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public editComment(commentDTO: CommentDTO, id: number, observe?: 'body', reportProgress?: boolean): Observable<ResponseEntity>;
    public editComment(commentDTO: CommentDTO, id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ResponseEntity>>;
    public editComment(commentDTO: CommentDTO, id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ResponseEntity>>;
    public editComment(commentDTO: CommentDTO, id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (commentDTO === null || commentDTO === undefined) {
            throw new Error('Required parameter commentDTO was null or undefined when calling editComment.');
        }
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling editComment.');
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

        return this.httpClient.put<ResponseEntity>(`${this.basePath}/api/v1/news/${encodeURIComponent(String(id))}/comment`,
            commentDTO,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Post news
     * 
     * @param commentDTO commentDTO
     * @param id id
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public postComment(commentDTO: CommentDTO, id: number, observe?: 'body', reportProgress?: boolean): Observable<CommentDTO>;
    public postComment(commentDTO: CommentDTO, id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<CommentDTO>>;
    public postComment(commentDTO: CommentDTO, id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<CommentDTO>>;
    public postComment(commentDTO: CommentDTO, id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (commentDTO === null || commentDTO === undefined) {
            throw new Error('Required parameter commentDTO was null or undefined when calling postComment.');
        }
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling postComment.');
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

        return this.httpClient.post<CommentDTO>(`${this.basePath}/api/v1/news/${encodeURIComponent(String(id))}/comment`,
            commentDTO,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}