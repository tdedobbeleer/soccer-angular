import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {Routes, RouterModule} from "@angular/router";
import {AuthGuardAdminService} from "../services/auth-guard-admin.service";
import {SharedModule} from "./shared.module";
import {AlertModule, BsDatepickerModule, DatepickerModule, TimepickerModule} from "ngx-bootstrap";
import {EditMatchComponent} from "../components/edit-match/edit-match.component";
import {CreateMatchComponent} from "../components/create-match/create-match.component";
import {MatchesComponent} from "../components/matches/matches.component";
import {MatchFormComponent} from "../components/match-form/match-form.component";
import {SeasonComponent} from "../components/season/season.component";
import {MatchComponent} from "../components/match/match.component";
import {NextMatchComponent} from "../components/next-match/next-match.component";
import {EditMatchFormComponent} from "../components/edit-match-form/edit-match-form.component";
import {GoalsComponent} from "../components/goal/goal.component";
import {SeasonsrestcontrollerApi} from "../ws/soccer/api/SeasonsrestcontrollerApi";
import {MatchesrestcontrollerApi} from "../ws/soccer/api/MatchesrestcontrollerApi";
import {ForecastrestcontrollerApi} from "../ws/weather/api/ForecastrestcontrollerApi";
import {TeamsrestcontrollerApi} from "../ws/soccer/api/TeamsrestcontrollerApi";
import {LaddaModule} from "angular2-ladda";

const routes: Routes = [
    {path: '', component: MatchesComponent},
    {path: 'create', component: CreateMatchComponent, canActivate: [AuthGuardAdminService]},
    {path: 'edit/:id', component: EditMatchComponent, canActivate: [AuthGuardAdminService]},
];

@NgModule({

    imports: [
        CommonModule,
        SharedModule,
        TimepickerModule.forRoot(),
        BsDatepickerModule.forRoot(),
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
        MatchComponent,
        MatchesComponent,
        SeasonComponent,
        MatchFormComponent,
        CreateMatchComponent,
        NextMatchComponent,
        EditMatchComponent,
        GoalsComponent,
        EditMatchFormComponent,
    ],
    providers: [
        MatchesrestcontrollerApi,
        SeasonsrestcontrollerApi,
        ForecastrestcontrollerApi,
        TeamsrestcontrollerApi,
    ]
})
export class MatchesModule {
}
