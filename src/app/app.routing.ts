
import { RouterModule  }     from '@angular/router';

import {NotFoundComponent} from "./not-found/not-found.component";
import {MessagesComponent} from "./messages/messages.component";

export const routing = RouterModule.forRoot([
	{ path: '', component: MessagesComponent },
    { path: 'not-found', component: NotFoundComponent },
	{ path: '**', redirectTo: 'not-found' }
]);