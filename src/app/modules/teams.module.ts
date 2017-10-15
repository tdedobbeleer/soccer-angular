import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {Routes, RouterModule} from "@angular/router";
import {AuthGuardAdminService} from "../services/auth-guard-admin.service";
import {SharedModule} from "./shared.module";
import {AlertModule} from "ngx-bootstrap";
import {CreateTeamComponent} from "../components/create-team/create-team.component";
import {TeamsListComponent} from "../components/teams-list/teams-list.component";
import {EditTeamComponent} from "../components/edit-team/edit-team.component";
import {EditTeamFormComponent} from "../components/edit-team-form/edit-team-form.component";
import {CreateTeamFormComponent} from "../components/create-team-form/create-team-form.component";
import {TeamComponent} from "../components/team/team.component";
import {TeamsrestcontrollerApi} from "../ws/soccer/api/TeamsrestcontrollerApi";
import {LaddaModule} from "angular2-ladda";

const routes: Routes = [
    {path: '', component: TeamsListComponent},
    {path: 'create', component: CreateTeamComponent, canActivate: [AuthGuardAdminService]},
    {path: 'edit/:id', component: EditTeamComponent, canActivate: [AuthGuardAdminService]},
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
        EditTeamFormComponent,
        CreateTeamFormComponent,
        CreateTeamComponent,
        EditTeamComponent,
        TeamComponent,
        TeamsListComponent,
    ],
    providers: [
        TeamsrestcontrollerApi,
    ]
})
export class TeamsModule {
}
