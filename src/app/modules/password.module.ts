import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "./shared.module";
import {AlertModule} from "ngx-bootstrap";
import {RequestRecoveryCodeFormComponent} from "../components/request-recovery-code-form/request-recovery-code-form.component";
import {RecoveryCodeFormComponent} from "../components/recovery-code-form/recovery-code-form.component";
import {LaddaModule} from "angular2-ladda";

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
        LaddaModule.forRoot({
            style: "expand-right",
            spinnerSize: 20,
            spinnerColor: "white",
            spinnerLines: 12
        }),
    ],
    declarations: [
        RequestRecoveryCodeFormComponent,
        RecoveryCodeFormComponent,
    ]
})
export class PasswordModule {
}
