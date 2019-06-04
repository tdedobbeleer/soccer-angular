import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {Configuration} from './configuration';

import {AccountProfileRestControllerService} from './api/accountProfileRestController.service';
import {AccountRestControllerService} from './api/accountRestController.service';
import {AuthenticationControllerService} from './api/authenticationController.service';
import {CommentsRestControllerService} from './api/commentsRestController.service';
import {DoodleRestControllerService} from './api/doodleRestController.service';
import {ErrorRestControllerService} from './api/errorRestController.service';
import {MatchesRestControllerService} from './api/matchesRestController.service';
import {NewsRestControllerService} from './api/newsRestController.service';
import {PasswordRecoveryRestControllerService} from './api/passwordRecoveryRestController.service';
import {PollRestControllerService} from './api/pollRestController.service';
import {RegistrationRestControllerService} from './api/registrationRestController.service';
import {SeasonsRestControllerService} from './api/seasonsRestController.service';
import {StatisticsRestControllerService} from './api/statisticsRestController.service';
import {TeamsRestControllerService} from './api/teamsRestController.service';

@NgModule({
  imports:      [ CommonModule, HttpClientModule ],
  declarations: [],
  exports:      [],
  providers: [
    AccountProfileRestControllerService,
    AccountRestControllerService,
    AuthenticationControllerService,
    CommentsRestControllerService,
    DoodleRestControllerService,
    ErrorRestControllerService,
    MatchesRestControllerService,
    NewsRestControllerService,
    PasswordRecoveryRestControllerService,
    PollRestControllerService,
    RegistrationRestControllerService,
    SeasonsRestControllerService,
    StatisticsRestControllerService,
    TeamsRestControllerService ]
})
export class ApiModule {
    public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders {
        return {
            ngModule: ApiModule,
            providers: [ { provide: Configuration, useFactory: configurationFactory } ]
        }
    }

    constructor( @Optional() @SkipSelf() parentModule: ApiModule) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import your base AppModule only.');
        }
    }
}
