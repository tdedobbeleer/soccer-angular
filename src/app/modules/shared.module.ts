import {ModuleWithProviders, NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TranslationPipe} from "../pipes/translation.pipe";
import {ValidationService} from "../services/validation.service";
import {ErrorHandlerService} from "../services/error-handler.service";
import {TranslationService} from "../services/translation.service";
import {LoginService} from "../services/login.service";
import {AuthGuardAdminService} from "../services/auth-guard-admin.service";
import {AuthGuardService} from "../services/auth-guard.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ReCaptchaModule} from "angular2-recaptcha";
import {DataTablesModule} from "angular-datatables";
import {SafeTranslationPipe} from "../pipes/safe-translation.pipe";
import {SafePipe} from "../pipes/safe.pipe";
import {LoadingComponent} from "../components/loading/loading.component";
import {FocusOnSuccessDirective} from "../directives/focus-on-success.directive";
import {FocusOnErrorDirective} from "../directives/focus-on-error.directive";
import {RouterModule} from "@angular/router";
import {PaginationComponent} from "../components/pagination/pagination.component";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
    imports: [
        CommonModule,
        DataTablesModule,
        ReCaptchaModule,
        FormsModule,
        ReactiveFormsModule,
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
        HttpClientModule,
        RouterModule,
        LoadingComponent,
        PaginationComponent,
        TranslationPipe,
        SafePipe,
        SafeTranslationPipe,
        FocusOnSuccessDirective,
        FocusOnErrorDirective,
        CommonModule,

    ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [
                AuthGuardService,
                AuthGuardAdminService,
                LoginService,
                TranslationService,
                ErrorHandlerService,
                ValidationService,
            ]
        };
    }
}
