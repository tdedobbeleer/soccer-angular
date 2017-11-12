import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {Routes, RouterModule} from "@angular/router";
import {SharedModule} from "./shared.module";
import {AlertModule} from "ngx-bootstrap";
import {DoodlerestcontrollerApi} from "../ws/soccer/api/DoodlerestcontrollerApi";
import {DoodleListComponent} from "../components/doodle-list/doodle-list.component";
import {DoodleComponent} from "../components/doodle/doodle.component";
import {LaddaModule} from "angular2-ladda";
import {DoodleItemComponent} from "../components/doodle-item/doodle-item.component";

const routes: Routes = [
    {path: '', component: DoodleListComponent},
    {path: ':id', component: DoodleItemComponent},
];

@NgModule({

    imports: [
        CommonModule,
        SharedModule,
        AlertModule.forRoot(),
        RouterModule.forChild(routes),
        LaddaModule.forRoot({
            style: "zoom-in",
            spinnerSize: 20,
            spinnerColor: "darkgrey",
            spinnerLines: 12
        }),
    ],
    declarations: [
        DoodleItemComponent,
        DoodleListComponent,
        DoodleComponent,

    ],
    providers: [
        DoodlerestcontrollerApi,
    ]
})
export class DoodlesModule {
}
