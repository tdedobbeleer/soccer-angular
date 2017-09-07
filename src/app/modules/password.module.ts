import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {Routes, RouterModule} from "@angular/router";
import {SharedModule} from "./shared.module";
import {AlertModule} from "ngx-bootstrap";
import {RequestRecoveryCodeFormComponent} from "../components/request-recovery-code-form/request-recovery-code-form.component";
import {RecoveryCodeFormComponent} from "../components/recovery-code-form/recovery-code-form.component";
import {PasswordrecoveryrestcontrollerApi} from "../ws/soccer/api/PasswordrecoveryrestcontrollerApi";

const routes: Routes = [
    {path: 'recovery/request', component: RequestRecoveryCodeFormComponent},
    {path: 'recovery', component: RecoveryCodeFormComponent},
];

@NgModule({

    imports: [
        CommonModule,
        SharedModule,
        AlertModule.forRoot(),
        RouterModule.forChild(routes),
    ],
    declarations: [
        RequestRecoveryCodeFormComponent,
        RecoveryCodeFormComponent,
    ],
    providers: [
        PasswordrecoveryrestcontrollerApi,
    ]
})
export class PasswordModule {
}
