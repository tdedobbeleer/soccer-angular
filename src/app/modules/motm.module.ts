import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "./shared.module";
import {AlertModule} from "ngx-bootstrap";
import {MotmPollsComponent} from "../components/motm-polls/motm-polls.component";
import {MotmPollComponent} from "../components/motm-poll/motm-poll.component";
import {LaddaModule} from "angular2-ladda";

const routes: Routes = [
    {path: '', component: MotmPollsComponent},
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
        MotmPollsComponent,
        MotmPollComponent,
    ]
})
export class MotmModule {
}
