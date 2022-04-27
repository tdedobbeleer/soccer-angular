import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditMessageFormComponent} from '../components/edit-message-form/edit-message-form.component';
import {EditMessageComponent} from '../components/edit-message/edit-message.component';
import {CreateMessageComponent} from '../components/create-message/create-message.component';
import {TinymceComponent} from '../components/tinymce/tinymce.component';
import {MessageFormComponent} from '../components/message-form/message-form.component';
import {RouterModule, Routes} from '@angular/router';
import {MessagesComponent} from '../components/messages/messages.component';
import {AuthGuardAdminService} from '../services/auth-guard-admin.service';
import {MessageItemComponent} from '../components/message-item/message-item.component';
import {SharedModule} from './shared.module';
import {CommentFormComponent} from '../components/comment-form/comment-form.component';
import {CommentComponent} from '../components/comment/comment.component';
import {MessageComponent} from '../components/message/message.component';
import {AlertModule} from 'ngx-bootstrap';
import {LaddaModule} from 'angular2-ladda';
import {ShareModule} from '@ngx-share/core';
import {RecentMessagesComponent} from '../components/recentMessages/recent-messages.component';

const routes: Routes = [
    {path: '', component: RecentMessagesComponent},
    {path: 'messages', component: MessagesComponent},
    {path: 'messages/create', component: CreateMessageComponent, canActivate: [AuthGuardAdminService]},
    {path: 'messages/:id', component: MessageItemComponent},
    {path: 'messages/edit/:id', component: EditMessageComponent, canActivate: [AuthGuardAdminService]},
];

@NgModule({

    imports: [
        CommonModule,
        SharedModule,
        AlertModule.forRoot(),
        RouterModule.forChild(routes),
        ShareModule,
        LaddaModule.forRoot({
            style: "expand-right",
            spinnerSize: 20,
            spinnerColor: "white",
            spinnerLines: 12
        })
    ],
    declarations: [
        MessagesComponent,
        MessageComponent,
        RecentMessagesComponent,
        EditMessageComponent,
        EditMessageFormComponent,
        TinymceComponent,
        CreateMessageComponent,
        MessageFormComponent,
        MessageItemComponent,
        CommentFormComponent,
        CommentComponent,
    ]
})
export class MessageModule {
}
