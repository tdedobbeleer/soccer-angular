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

export interface MatchPollDTO {
    id?: number;

    matchDate?: string;

    matchDescription?: string;

    matchId?: number;

    options?: Array<models.AccountDTO>;

    status?: string;

    totalVotes?: number;

    votes?: Array<models.VotesDTO>;

}
