/* tslint:disable:no-unused-variable */
import {TestBed, inject} from "@angular/core/testing";
import {AuthGuardAdminService} from "./auth-guard-admin.service";

describe('Service: AuthGuardAdmin', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [AuthGuardAdminService]
        });
    });

    it('should ...', inject([AuthGuardAdminService], (service: AuthGuardAdminService) => {
        expect(service).toBeTruthy();
    }));
});
