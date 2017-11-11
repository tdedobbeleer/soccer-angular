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

import * as models from './models';

export interface PageDTONewsDTO {
    currentPage?: number;

    hasNext?: boolean;

    hasPrevious?: boolean;

    list?: Array<models.NewsDTO>;

    totalPages?: number;

    totalSize?: number;

}
