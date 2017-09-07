import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {Routes, RouterModule} from "@angular/router";
import {SharedModule} from "./shared.module";
import {AlertModule} from "ngx-bootstrap";
import {DoodlerestcontrollerApi} from "../ws/soccer/api/DoodlerestcontrollerApi";
import {DoodleListComponent} from "../components/doodle-list/doodle-list.component";
import {DoodleComponent} from "../components/doodle/doodle.component";

const routes: Routes = [
    {path: '', component: DoodleListComponent},
];

@NgModule({

    imports: [
        CommonModule,
        SharedModule,
        AlertModule.forRoot(),
        RouterModule.forChild(routes),
    ],
    declarations: [
        DoodleListComponent,
        DoodleComponent,

    ],
    providers: [
        DoodlerestcontrollerApi,
    ]
})
export class DoodlesModule {
}
