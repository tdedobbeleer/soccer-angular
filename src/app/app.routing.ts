
import { RouterModule  }     from '@angular/router';

import {NotFoundComponent} from "./not-found/not-found.component";
import {MessagesComponent} from "./messages/messages.component";
import {TeamsListComponent} from "./teams-list/teams-list.component";
import {LoginComponent} from "./login/login.component";

export const routing = RouterModule.forRoot([
	{ path: '', component: MessagesComponent },
    { path: 'not-found', component: NotFoundComponent },
	{ path: 'messages', component: MessagesComponent },
	{ path: 'teams', component: TeamsListComponent },
	{ path: 'login', component: LoginComponent },
	{ path: '**', redirectTo: 'not-found' }
]);