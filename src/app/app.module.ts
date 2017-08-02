import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {AlertModule, BsDropdownModule, CollapseModule, DatepickerModule, TimepickerModule} from "ngx-bootstrap";
import {AppComponent} from "./app.component";
import {NavbarComponent} from "./components/navbar/navbar.component";
import {NotFoundComponent} from "./components/not-found/not-found.component";
import {MessagesComponent} from "./components/messages/messages.component";
import {FooterComponent} from "./components/footer/footer.component";
import {TeamsListComponent} from "./components/teams-list/teams-list.component";
import {MessageComponent} from "./components/message/message.component";
import {NewsrestcontrollerApi} from "./ws/soccer/api/NewsrestcontrollerApi";
import {AuthenticationcontrollerApi} from "./ws/soccer/api/AuthenticationcontrollerApi";
import {CommentFormComponent} from "./components/comment-form/comment-form.component";
import {LoginComponent} from "./components/login/login.component";
import {AuthGuardService} from "./services/auth-guard.service";
import {LoginService} from "./services/login.service";
import {TranslationPipe} from "./pipes/translation.pipe";
import {TranslationService} from "./services/translation.service";
import {Routes, RouterModule} from "@angular/router";
import {MatchComponent} from "./components/match/match.component";
import {MatchesComponent} from "./components/matches/matches.component";
import {SeasonComponent} from "./components/season/season.component";
import {MatchesrestcontrollerApi} from "./ws/soccer/api/MatchesrestcontrollerApi";
import {SeasonsrestcontrollerApi} from "./ws/soccer/api/SeasonsrestcontrollerApi";
import {TinymceComponent} from "./components/tinymce/tinymce.component";
import {CreateMessageComponent} from "./components/create-message/create-message.component";
import {MessageFormComponent} from "./components/message-form/message-form.component";
import {AuthGuardAdminService} from "./services/auth-guard-admin.service";
import {PaginationComponent} from "./components/pagination/pagination.component";
import {CommentsrestcontrollerApi} from "./ws/soccer/api/CommentsrestcontrollerApi";
import {CommentComponent} from "./components/comment/comment.component";
import {BASE_PATH} from "./ws/soccer/variables";
import {MatchFormComponent} from "./components/match-form/match-form.component";
import {TeamFormComponent} from "./components/team-form/team-form.component";
import {CreateMatchComponent} from "./components/create-match/create-match.component";
import {TeamsrestcontrollerApi} from "./ws/soccer/api/TeamsrestcontrollerApi";
import {FailWhaleComponent} from "./components/fail-whale/fail-whale.component";
import {ErrorHandlerService} from "./services/error-handler.service";
import {MotmPollsComponent} from "./components/motm-polls/motm-polls.component";
import {MotmPollComponent} from "./components/motm-poll/motm-poll.component";
import {PollrestcontrollerApi} from "./ws/soccer/api/PollrestcontrollerApi";
import {TeamComponent} from "./components/team/team.component";
import {SafePipe} from "./pipes/safe.pipe";
import {ForecastrestcontrollerApi} from "./ws/weather/api/ForecastrestcontrollerApi";
import {NextMatchComponent} from "./components/next-match/next-match.component";
import {environment} from "../environments/environment";
import {RegistrationFormComponent} from "./components/registration-form/registration-form.component";
import {ReCaptchaModule} from "angular2-recaptcha";
import {RegistrationrestcontrollerApi} from "./ws/soccer/api/RegistrationrestcontrollerApi";
import {ValidationService} from "./services/validation.service";
import {SafeTranslationPipe} from "./pipes/safe-translation.pipe";
import {AccountListComponent} from "./components/account-list/account-list.component";
import {AccountrestcontrollerApi} from "./ws/soccer/api/AccountrestcontrollerApi";
import {DoodleListComponent} from "./components/doodle-list/doodle-list.component";
import {DoodleComponent} from "./components/doodle/doodle.component";
import {DoodlerestcontrollerApi} from "./ws/soccer/api/DoodlerestcontrollerApi";
import {PasswordrecoveryrestcontrollerApi} from "./ws/soccer/api/PasswordrecoveryrestcontrollerApi";
import {RequestRecoveryCodeFormComponent} from "./components/request-recovery-code-form/request-recovery-code-form.component";
import {RecoveryCodeFormComponent} from "./components/recovery-code-form/recovery-code-form.component";
import {FocusOnErrorDirective} from "./directives/focus-on-error.directive";
import {ServiceUnavailableComponent} from "./components/service-unavailable/service-unavailable.component";
import {EditMatchComponent} from "./components/edit-match/edit-match.component";
import {GoalsComponent} from "./components/goal/goal.component";

const appRoutes: Routes = [
    {path: '', component: MessagesComponent},
    {path: 'not-found', component: NotFoundComponent},
    {path: 'failwhale', component: FailWhaleComponent},
    {path: 'messages', component: MessagesComponent},
    {path: 'teams', component: TeamsListComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegistrationFormComponent},
    {path: 'matches', component: MatchesComponent},
    {path: 'manofthematch', component: MotmPollsComponent},
    {path: 'doodles', component: DoodleListComponent},
    {path: 'unavailable', component: ServiceUnavailableComponent},
    {path: 'accounts', component: AccountListComponent, canActivate: [AuthGuardAdminService]},
    {path: 'messages/create', component: CreateMessageComponent, canActivate: [AuthGuardAdminService]},
    {path: 'matches/create', component: CreateMatchComponent, canActivate: [AuthGuardAdminService]},
    {path: 'matches/edit/:id', component: EditMatchComponent, canActivate: [AuthGuardAdminService]},
    {path: 'password/recovery/request', component: RequestRecoveryCodeFormComponent},
    {path: 'password/recovery', component: RecoveryCodeFormComponent},
    {path: '**', redirectTo: 'not-found'}
];

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        NotFoundComponent,
        MessagesComponent,
        FooterComponent,
        TeamsListComponent,
        MessageComponent,
        CommentFormComponent,
        LoginComponent,
        TranslationPipe,
        MatchComponent,
        MatchesComponent,
        SeasonComponent,
        TinymceComponent,
        CreateMessageComponent,
        MessageFormComponent,
        PaginationComponent,
        CommentComponent,
        MatchFormComponent,
        TeamFormComponent,
        CreateMatchComponent,
        FailWhaleComponent,
        MotmPollsComponent,
        MotmPollComponent,
        TeamComponent,
        SafePipe,
        NextMatchComponent,
        RegistrationFormComponent,
        SafeTranslationPipe,
        AccountListComponent,
        DoodleListComponent,
        DoodleComponent,
        RequestRecoveryCodeFormComponent,
        RecoveryCodeFormComponent,
        FocusOnErrorDirective,
        ServiceUnavailableComponent,
        EditMatchComponent,
        GoalsComponent,
    ],
    imports: [
        ReCaptchaModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        TimepickerModule.forRoot(),
        AlertModule.forRoot(),
        BsDropdownModule.forRoot(),
        CollapseModule.forRoot(),
        DatepickerModule.forRoot(),
        RouterModule.forRoot(appRoutes)
    ],
    providers: [
        {provide: BASE_PATH, useValue: environment.api_url},
        NewsrestcontrollerApi,
        MatchesrestcontrollerApi,
        SeasonsrestcontrollerApi,
        CommentsrestcontrollerApi,
        AuthenticationcontrollerApi,
        PollrestcontrollerApi,
        TeamsrestcontrollerApi,
        ForecastrestcontrollerApi,
        RegistrationrestcontrollerApi,
        AccountrestcontrollerApi,
        DoodlerestcontrollerApi,
        PasswordrecoveryrestcontrollerApi,
        AuthGuardService,
        AuthGuardAdminService,
        LoginService,
        TranslationService,
        ErrorHandlerService,
        ValidationService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
