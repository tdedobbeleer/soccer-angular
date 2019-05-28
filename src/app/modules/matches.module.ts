import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {AuthGuardAdminService} from "../services/auth-guard-admin.service";
import {SharedModule} from "./shared.module";
import {AlertModule, BsDatepickerModule, TabsModule, TimepickerModule} from 'ngx-bootstrap';
import {EditMatchComponent} from "../components/edit-match/edit-match.component";
import {CreateMatchComponent} from "../components/create-match/create-match.component";
import {MatchesComponent} from "../components/matches/matches.component";
import {MatchFormComponent} from "../components/match-form/match-form.component";
import {SeasonComponent} from "../components/season/season.component";
import {MatchComponent} from "../components/match/match.component";
import {NextMatchComponent} from "../components/next-match/next-match.component";
import {EditMatchFormComponent} from "../components/edit-match-form/edit-match-form.component";
import {GoalsComponent} from "../components/goal/goal.component";
import {LaddaModule} from "angular2-ladda";
import {environment} from "../../environments/environment";
import {ForecastApiModule} from "../ws/weather/forecastApi.module";
import {ForecastApiConfiguration} from "../ws/weather/forecastApiConfiguration";

const routes: Routes = [
    {path: '', component: MatchesComponent},
    {path: 'create', component: CreateMatchComponent, canActivate: [AuthGuardAdminService]},
    {path: 'edit/:id', component: EditMatchComponent, canActivate: [AuthGuardAdminService]},
];

export function forecastApiConfig() {
    return new ForecastApiConfiguration({
        accessToken: environment.weather_api_key,
        basePath: environment.weather_api_url,
        country: environment.weather_api_country
    });
}

@NgModule({

    imports: [
        CommonModule,
        SharedModule,
        TimepickerModule.forRoot(),
        BsDatepickerModule.forRoot(),
        AlertModule.forRoot(),
        RouterModule.forChild(routes),
        ForecastApiModule.forRoot(forecastApiConfig),
        LaddaModule.forRoot({
            style: 'expand-right',
            spinnerSize: 20,
            spinnerColor: 'white',
            spinnerLines: 12
        }),
        TabsModule,
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
    ]
})
export class MatchesModule {
}
