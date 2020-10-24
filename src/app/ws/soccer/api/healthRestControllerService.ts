/**
 * Soccer API
 **/

import {Inject, Injectable, Optional} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Configuration} from '../configuration';
import {BASE_PATH} from '../variables';


@Injectable()
export class HealthRestControllerService {

    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();
    protected basePath = 'https://localhost:8080';

    constructor(protected httpClient: HttpClient, @Optional() @Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
            this.basePath = basePath || configuration.basePath || this.basePath;
        }
    }

    public getHealth(observe: any = 'body', reportProgress: boolean = false): Observable<any> {
        let headers = this.defaultHeaders;

        return this.httpClient.get(`${this.basePath}/actuator/health`,
            {
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }
}
