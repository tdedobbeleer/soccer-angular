import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {EditMessageFormComponent} from "../components/edit-message-form/edit-message-form.component";
import {EditMessageComponent} from "../components/edit-message/edit-message.component";
import {CreateMessageComponent} from "../components/create-message/create-message.component";
import {TinymceComponent} from "../components/tinymce/tinymce.component";
import {MessageFormComponent} from "../components/message-form/message-form.component";
import {Routes, RouterModule} from "@angular/router";
import {MessagesComponent} from "../components/messages/messages.component";
import {AuthGuardAdminService} from "../services/auth-guard-admin.service";
import {MessageItemComponent} from "../components/message-item/message-item.component";
import {SharedModule} from "./shared.module";
import {CommentsrestcontrollerApi} from "../ws/soccer/api/CommentsrestcontrollerApi";
import {NewsrestcontrollerApi} from "../ws/soccer/api/NewsrestcontrollerApi";
import {CommentFormComponent} from "../components/comment-form/comment-form.component";
import {CommentComponent} from "../components/comment/comment.component";
import {MessageComponent} from "../components/message/message.component";
import {AlertModule} from "ngx-bootstrap";

const routes: Routes = [
    {path: '', component: MessagesComponent},
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
    ],
    declarations: [
        MessagesComponent,
        MessageComponent,
        EditMessageComponent,
        EditMessageFormComponent,
        TinymceComponent,
        CreateMessageComponent,
        MessageFormComponent,
        MessageItemComponent,
        CommentFormComponent,
        CommentComponent,
    ],
    providers: [
        CommentsrestcontrollerApi,
        NewsrestcontrollerApi,
    ]
})
export class MessageModule {
}
