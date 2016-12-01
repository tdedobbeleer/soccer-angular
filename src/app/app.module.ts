import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AlertModule } from 'ng2-bootstrap/ng2-bootstrap';
import { CollapseDirective } from 'ng2-bootstrap/ng2-bootstrap';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MessagesComponent } from './messages/messages.component';
import { FooterComponent } from './footer/footer.component';
import {routing} from "./app.routing";
import { TeamsListComponent } from './teams-list/teams-list.component';
import { MessageComponent } from './message/message.component';
import {NewsrestcontrollerApi} from "./ws/api/NewsrestcontrollerApi";
import {AuthenticationcontrollerApi} from "./ws/api/AuthenticationcontrollerApi";
import { CommentListComponent } from './comment-list/comment-list.component';
import { CommentFormComponent } from './comment-form/comment-form.component';
import { LoginComponent } from './login/login.component';
import {AuthGuardService} from "./services/auth-guard.service";
import {LoginService} from "./services/login.service";

@NgModule({
    declarations: [
        AppComponent,
        CollapseDirective,
        NavbarComponent,
        NotFoundComponent,
        MessagesComponent,
        FooterComponent,
        TeamsListComponent,
        MessageComponent,
        CommentListComponent,
        CommentFormComponent,
        LoginComponent,
    ],
    imports: [
        routing,
        BrowserModule,
        FormsModule,
        HttpModule,
        AlertModule
    ],
    providers: [
        NewsrestcontrollerApi,
        AuthenticationcontrollerApi,
        AuthGuardService,
        LoginService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
