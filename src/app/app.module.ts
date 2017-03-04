import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {AlertModule, DropdownModule, CollapseModule} from "ng2-bootstrap/ng2-bootstrap";
import {AppComponent} from "./app.component";
import {NavbarComponent} from "./components/navbar/navbar.component";
import {NotFoundComponent} from "./components/not-found/not-found.component";
import {MessagesComponent} from "./components/messages/messages.component";
import {FooterComponent} from "./components/footer/footer.component";
import {TeamsListComponent} from "./components/teams-list/teams-list.component";
import {MessageComponent} from "./components/message/message.component";
import {NewsrestcontrollerApi} from "./ws/api/NewsrestcontrollerApi";
import {AuthenticationcontrollerApi} from "./ws/api/AuthenticationcontrollerApi";
import {CommentFormComponent} from "./components/comment-form/comment-form.component";
import {LoginComponent} from "./components/login/login.component";
import {AuthGuardService} from "./services/auth-guard.service";
import {LoginService} from "./services/login.service";
import {AccountsComponent} from "./components/accounts/accounts.component";
import {TranslationPipe} from "./pipes/translation.pipe";
import {TranslationService} from "./services/translation.service";
import {Routes, RouterModule} from "@angular/router";
import {MatchComponent} from "./components/match/match.component";
import {MatchesComponent} from "./components/matches/matches.component";
import {SeasonComponent} from "./components/season/season.component";
import {MatchesrestcontrollerApi} from "./ws/api/MatchesrestcontrollerApi";
import {SeasonsrestcontrollerApi} from "./ws/api/SeasonsrestcontrollerApi";
import {TinymceComponent} from "./components/tinymce/tinymce.component";
import {CreateMessageComponent} from "./components/create-message/create-message.component";
import {MessageFormComponent} from "./components/message-form/message-form.component";
import {AuthGuardAdminService} from "./services/auth-guard-admin.service";
import {PaginationComponent} from "./components/pagination/pagination.component";
import {CommentsrestcontrollerApi} from "./ws/api/CommentsrestcontrollerApi";
import {CommentComponent} from "./components/comment/comment.component";
import {BASE_PATH} from "./ws/variables";
import {MatchFormComponent} from "./components/match-form/match-form.component";
import {TeamFormComponent} from "./components/team-form/team-form.component";
import {CreateMatchComponent} from "./components/create-match/create-match.component";
import {DatePickerModule} from "ng2-datepicker";
import {TeamsrestcontrollerApi} from "./ws/api/TeamsrestcontrollerApi";

const appRoutes: Routes = [
    {path: '', component: MessagesComponent},
    {path: 'not-found', component: NotFoundComponent},
    {path: 'messages', component: MessagesComponent},
    {path: 'teams', component: TeamsListComponent},
    {path: 'login', component: LoginComponent},
    {path: 'matches', component: MatchesComponent},
    {path: 'accounts', component: AccountsComponent, canActivate: [AuthGuardAdminService]},
    {path: 'messages/create', component: CreateMessageComponent, canActivate: [AuthGuardAdminService]},
    {path: 'matches/create', component: CreateMatchComponent, canActivate: [AuthGuardAdminService]},
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
        AccountsComponent,
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
        CreateMatchComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        AlertModule,
        DropdownModule,
        CollapseModule,
        DatePickerModule,
        RouterModule.forRoot(appRoutes)
    ],
    providers: [
        {provide: BASE_PATH, useValue: 'http://localhost:8080'},
        NewsrestcontrollerApi,
        MatchesrestcontrollerApi,
        SeasonsrestcontrollerApi,
        CommentsrestcontrollerApi,
        AuthenticationcontrollerApi,
        TeamsrestcontrollerApi,
        AuthGuardService,
        AuthGuardAdminService,
        LoginService,
        TranslationService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
