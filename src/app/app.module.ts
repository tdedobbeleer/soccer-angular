import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {
    AlertModule,
    BsDropdownModule,
    CollapseModule,
    DatepickerModule,
    TimepickerModule,
    AccordionModule
} from "ngx-bootstrap";
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
import {FocusOnSuccessDirective} from "./directives/focus-on-success.directive";
import {EditMatchFormComponent} from "./components/edit-match-form/edit-match-form.component";
import {AccountprofilerestcontrollerApi} from "./ws/soccer/api/AccountprofilerestcontrollerApi";
import {PlayerComponent} from "./components/player/player.component";
import {PlayerListComponent} from "./components/player-list/player-list.component";
import {EditAccountFormComponent} from "./components/edit-account-form/edit-account-form.component";
import {EditAccountComponent} from "./components/edit-account/edit-account.component";
import {ImageUploadModule} from "angular2-image-upload";
import {EditMessageComponent} from "./components/edit-message/edit-message.component";
import {EditMessageFormComponent} from "./components/edit-message-form/edit-message-form.component";
import {EditTeamFormComponent} from "./components/edit-team-form/edit-team-form.component";
import {CreateTeamFormComponent} from "./components/create-team-form/create-team-form.component";
import {CreateTeamComponent} from "./components/create-team/create-team.component";
import {EditTeamComponent} from "./components/edit-team/edit-team.component";
import {StatisticsListComponent} from "./components/statistics-list/statistics-list.component";
import {StatisticsrestcontrollerApi} from "./ws/soccer/api/StatisticsrestcontrollerApi";
import {DataTablesModule} from "angular-datatables";
import {LoadingComponent} from "./components/loading/loading.component";
import {FaqComponent} from "./components/faq/faq.component";
import {MessageItemComponent} from "./components/message-item/message-item.component";

const appRoutes: Routes = [
    {path: '', component: MessagesComponent},
    {path: 'not-found', component: NotFoundComponent},
    {path: 'faq', component: FaqComponent},
    {path: 'failwhale', component: FailWhaleComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegistrationFormComponent},
    {path: 'statistics', component: StatisticsListComponent},
    {path: 'team', component: PlayerListComponent},
    {path: 'manofthematch', component: MotmPollsComponent},
    {path: 'doodles', component: DoodleListComponent},
    {path: 'unavailable', component: ServiceUnavailableComponent},
    {path: 'account/profile/edit/:id', component: EditAccountComponent},
    {path: 'messages', component: MessagesComponent},
    {path: 'messages/create', component: CreateMessageComponent, canActivate: [AuthGuardAdminService]},
    {path: 'messages/:id', component: MessageItemComponent},
    {path: 'messages/edit/:id', component: EditMessageComponent, canActivate: [AuthGuardAdminService]},
    {path: 'teams', component: TeamsListComponent},
    {path: 'teams/create', component: CreateTeamComponent, canActivate: [AuthGuardAdminService]},
    {path: 'teams/edit/:id', component: EditTeamComponent, canActivate: [AuthGuardAdminService]},
    {path: 'accounts', component: AccountListComponent, canActivate: [AuthGuardAdminService]},
    {path: 'matches', component: MatchesComponent},
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
        FocusOnSuccessDirective,
        EditMatchFormComponent,
        PlayerComponent,
        PlayerListComponent,
        EditAccountFormComponent,
        EditAccountComponent,
        EditMessageComponent,
        EditMessageFormComponent,
        EditTeamFormComponent,
        CreateTeamFormComponent,
        CreateTeamComponent,
        EditTeamComponent,
        StatisticsListComponent,
        LoadingComponent,
        FaqComponent,
        MessageItemComponent,
    ],
    imports: [
        DataTablesModule,
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
        ImageUploadModule.forRoot(),
        AccordionModule.forRoot(),
        RouterModule.forRoot(appRoutes)
    ],
    providers: [
        {provide: BASE_PATH, useValue: environment.api_url},
        StatisticsrestcontrollerApi,
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
        AccountprofilerestcontrollerApi,
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
