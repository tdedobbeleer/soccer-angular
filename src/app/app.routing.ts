
import { RouterModule  }     from '@angular/router';
import {MessagesComponent} from "./components/messages/messages.component";
import {NotFoundComponent} from "./components/not-found/not-found.component";
import {TeamsListComponent} from "./components/teams-list/teams-list.component";
import {LoginComponent} from "./components/login/login.component";
import {AccountsComponent} from "./components/accounts/accounts.component";
import {AuthGuardService} from "./services/auth-guard.service";


export const routing = RouterModule.forRoot([
	{ path: '', component: MessagesComponent },
    { path: 'not-found', component: NotFoundComponent },
	{ path: 'messages', component: MessagesComponent },
	{ path: 'teams', component: TeamsListComponent },
	{ path: 'login', component: LoginComponent },
	{path: 'accounts', component: AccountsComponent, canActivate: [AuthGuardService]},
	{ path: '**', redirectTo: 'not-found' }
]);