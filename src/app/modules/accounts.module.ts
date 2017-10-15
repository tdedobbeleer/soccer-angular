import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {Routes, RouterModule} from "@angular/router";
import {AuthGuardAdminService} from "../services/auth-guard-admin.service";
import {SharedModule} from "./shared.module";
import {AlertModule} from "ngx-bootstrap";
import {ActivateAccountComponent} from "../components/activate-account/activate-account.component";
import {AccountListComponent} from "../components/account-list/account-list.component";
import {EditAccountComponent} from "../components/edit-account/edit-account.component";
import {EditAccountFormComponent} from "../components/edit-account-form/edit-account-form.component";
import {ActivateAccountFormComponent} from "../components/activate-account-form/activate-account-form.component";
import {LaddaModule} from "angular2-ladda";

const routes: Routes = [
    {path: '', component: AccountListComponent, canActivate: [AuthGuardAdminService]},
    {path: ':id/activate', component: ActivateAccountComponent, canActivate: [AuthGuardAdminService]},
    {path: 'profile/edit/:id', component: EditAccountComponent},
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
        EditAccountFormComponent,
        EditAccountComponent,
        AccountListComponent,
        ActivateAccountFormComponent,
        ActivateAccountComponent,

    ],
    providers: []
})
export class AccountsModule {
}
