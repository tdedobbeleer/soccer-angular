import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AlertModule } from 'ng2-bootstrap/ng2-bootstrap';
import { CollapseDirective } from 'ng2-bootstrap/ng2-bootstrap';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { MessagesComponent } from './components/messages/messages.component';
import { FooterComponent } from './components/footer/footer.component';
import {routing} from "./app.routing";
import { TeamsListComponent } from './components/teams-list/teams-list.component';
import { MessageComponent } from './components/message/message.component';
import {NewsrestcontrollerApi} from "./ws/api/NewsrestcontrollerApi";
import {AuthenticationcontrollerApi} from "./ws/api/AuthenticationcontrollerApi";
import { CommentListComponent } from './components/comment-list/comment-list.component';
import { CommentFormComponent } from './components/comment-form/comment-form.component';
import { LoginComponent } from './components/login/login.component';
import {AuthGuardService} from "./services/auth-guard.service";
import {LoginService} from "./services/login.service";
import { AccountsComponent } from './components/accounts/accounts.component';
import { TranslationPipe } from './pipes/translation.pipe';
import {TranslationService} from "./services/translation.service";
import {TRANSLATION_PROVIDERS} from "./translations";

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
        AccountsComponent,
        TranslationPipe
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
        LoginService,
        TRANSLATION_PROVIDERS,
        TranslationService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
