import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "./shared.module";
import {AlertModule} from "ngx-bootstrap";
import {StatisticsListComponent} from "../components/statistics-list/statistics-list.component";

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

    ]
})
export class StatisticsModule {
}
