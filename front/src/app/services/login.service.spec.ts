/* tslint:disable:no-unused-variable */
import {TestBed, inject} from "@angular/core/testing";
import {LoginService} from "./login.service";

describe('Service: LoginService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginService]
    });
  });

  it('should ...', inject([LoginService], (service: LoginService) => {
    expect(service).toBeTruthy();
  }));
});
