/**
 * Soccer API
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 1.0
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import * as models from "./models";

export interface DoodleDTO {
    created?: Date;

    currentPresence?: models.PresenceDTO;

    id?: number;

    modified?: Date;

    presences?: Array<models.PresenceDTO>;

    stringCreated?: string;

    stringModfied?: string;

    total?: number;

}