import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {Routes, RouterModule} from "@angular/router";
import {SharedModule} from "./shared.module";
import {AlertModule} from "ngx-bootstrap";
import {SeasonsrestcontrollerApi} from "../ws/soccer/api/SeasonsrestcontrollerApi";
import {StatisticsListComponent} from "../components/statistics-list/statistics-list.component";
import {StatisticsrestcontrollerApi} from "../ws/soccer/api/StatisticsrestcontrollerApi";

const routes: Routes = [
    {path: '', component: StatisticsListComponent},
];

@NgModule({

    imports: [
        CommonModule,
        SharedModule,
        AlertModule.forRoot(),
        RouterModule.forChild(routes),
    ],
    declarations: [
        StatisticsListComponent,

    ],
    providers: [
        StatisticsrestcontrollerApi,
        SeasonsrestcontrollerApi,
    ]
})
export class StatisticsModule {
}
