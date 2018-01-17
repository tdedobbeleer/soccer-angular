import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {NotFoundComponent} from "./components/not-found/not-found.component";
import {FooterComponent} from "./components/footer/footer.component";
import {LoginComponent} from "./components/login/login.component";
import {RouterModule, Routes} from "@angular/router";
import {FailWhaleComponent} from "./components/fail-whale/fail-whale.component";
import {RegistrationFormComponent} from "./components/registration-form/registration-form.component";
import {ServiceUnavailableComponent} from "./components/service-unavailable/service-unavailable.component";
import {PlayerComponent} from "./components/player/player.component";
import {PlayerListComponent} from "./components/player-list/player-list.component";
import {FaqComponent} from "./components/faq/faq.component";
import {SharedModule} from "./modules/shared.module";
import {NavbarComponent} from "./components/navbar/navbar.component";
import {AccordionModule, AlertModule, BsDropdownModule, CollapseModule} from "ngx-bootstrap";
import {ImageUploadModule} from "angular2-image-upload";
import {BrowserModule} from "@angular/platform-browser";
import {LaddaModule} from "angular2-ladda";
import {ApiModule, Configuration} from "./ws/soccer";
import {environment} from "../environments/environment";

const appRoutes: Routes = [
    {path: '', loadChildren: './modules/message.module#MessageModule'},
    {path: 'matches', loadChildren: './modules/matches.module#MatchesModule'},
    {path: 'accounts', loadChildren: './modules/accounts.module#AccountsModule'},
    {path: 'teams', loadChildren: './modules/teams.module#TeamsModule'},
    {path: 'doodles', loadChildren: './modules/doodles.module#DoodlesModule'},
    {path: 'password', loadChildren: './modules/password.module#PasswordModule'},
    {path: 'manofthematch', loadChildren: './modules/motm.module#MotmModule'},
    {path: 'statistics', loadChildren: './modules/statistics.module#StatisticsModule'},
    {path: 'not-found', component: NotFoundComponent},
    {path: 'faq', component: FaqComponent},
    {path: 'failwhale', component: FailWhaleComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegistrationFormComponent},
    {path: 'team', component: PlayerListComponent},
    {path: 'unavailable', component: ServiceUnavailableComponent},
    {path: '**', redirectTo: 'not-found'}
];

export function apiConfig() {
    return new Configuration({
        basePath: environment.api_url,
        apiKeys: {}
    });
}

@NgModule({
    imports: [
        BrowserModule,
        AlertModule.forRoot(),
        BsDropdownModule.forRoot(),
        CollapseModule.forRoot(),
        ImageUploadModule.forRoot(),
        AccordionModule.forRoot(),
        SharedModule.forRoot(),
        RouterModule.forRoot(appRoutes),
        ApiModule.forRoot(apiConfig),
        LaddaModule.forRoot({
            style: "expand-right",
            spinnerSize: 20,
            spinnerColor: "white",
            spinnerLines: 12
        })
    ],
    declarations: [
        LoginComponent,
        NotFoundComponent,
        FailWhaleComponent,
        NavbarComponent,
        AppComponent,
        FooterComponent,
        RegistrationFormComponent,
        ServiceUnavailableComponent,
        PlayerComponent,
        PlayerListComponent,
        FaqComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
