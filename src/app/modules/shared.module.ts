import {NgModule, ModuleWithProviders} from "@angular/core";
import {CommonModule} from "@angular/common";
import {environment} from "../../environments/environment";
import {BASE_PATH} from "../ws/soccer/variables";
import {TranslationPipe} from "../pipes/translation.pipe";
import {ValidationService} from "../services/validation.service";
import {ErrorHandlerService} from "../services/error-handler.service";
import {TranslationService} from "../services/translation.service";
import {LoginService} from "../services/login.service";
import {AuthGuardAdminService} from "../services/auth-guard-admin.service";
import {AuthGuardService} from "../services/auth-guard.service";
import {AccountprofilerestcontrollerApi} from "../ws/soccer/api/AccountprofilerestcontrollerApi";
import {AccountrestcontrollerApi} from "../ws/soccer/api/AccountrestcontrollerApi";
import {RegistrationrestcontrollerApi} from "../ws/soccer/api/RegistrationrestcontrollerApi";
import {AuthenticationcontrollerApi} from "../ws/soccer/api/AuthenticationcontrollerApi";
import {HttpModule} from "@angular/http";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {ReCaptchaModule} from "angular2-recaptcha";
import {DataTablesModule} from "angular-datatables";
import {SafeTranslationPipe} from "../pipes/safe-translation.pipe";
import {SafePipe} from "../pipes/safe.pipe";
import {LoadingComponent} from "../components/loading/loading.component";
import {FocusOnSuccessDirective} from "../directives/focus-on-success.directive";
import {FocusOnErrorDirective} from "../directives/focus-on-error.directive";
import {RouterModule} from "@angular/router";
import {PaginationComponent} from "../components/pagination/pagination.component";

@NgModule({
    imports: [
        CommonModule,
        DataTablesModule,
        ReCaptchaModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        RouterModule,
    ],
    declarations: [
        PaginationComponent,
        LoadingComponent,
        TranslationPipe,
        SafePipe,
        SafeTranslationPipe,
        FocusOnSuccessDirective,
        FocusOnErrorDirective,
    ],
    exports: [
        DataTablesModule,
        ReCaptchaModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        RouterModule,
        LoadingComponent,
        PaginationComponent,
        TranslationPipe,
        SafePipe,
        SafeTranslationPipe,
        FocusOnSuccessDirective,
        FocusOnErrorDirective,
        CommonModule,

    ],
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [
                {provide: BASE_PATH, useValue: environment.api_url},
                AccountrestcontrollerApi,
                AccountprofilerestcontrollerApi,
                AuthenticationcontrollerApi,
                RegistrationrestcontrollerApi,
                AuthGuardService,
                AuthGuardAdminService,
                LoginService,
                TranslationService,
                ErrorHandlerService,
                ValidationService
            ]
        };
    }
}
