import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {FooterComponent} from './components/footer/footer.component';
import {LoginComponent} from './components/login/login.component';
import {RouterModule, Routes} from '@angular/router';
import {FailWhaleComponent} from './components/fail-whale/fail-whale.component';
import {RegistrationFormComponent} from './components/registration-form/registration-form.component';
import {ServiceUnavailableComponent} from './components/service-unavailable/service-unavailable.component';
import {PlayerComponent} from './components/player/player.component';
import {PlayerListComponent} from './components/player-list/player-list.component';
import {FaqComponent} from './components/faq/faq.component';
import {SharedModule} from './modules/shared.module';
import {NavbarComponent} from './components/navbar/navbar.component';
import {AccordionModule, AlertModule, BsDropdownModule, CollapseModule, TabsModule} from 'ngx-bootstrap';
import {ImageUploadModule} from 'angular2-image-upload';
import {BrowserModule} from '@angular/platform-browser';
import {LaddaModule} from 'angular2-ladda';
import {ApiModule, Configuration} from './ws/soccer';
import {environment} from '../environments/environment';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ServiceWorkerModule} from '@angular/service-worker';

const appRoutes: Routes = [
    {path: '', loadChildren: () => import('./modules/message.module').then(m => m.MessageModule)},
    {path: 'matches', loadChildren: () => import('./modules/matches.module').then(m => m.MatchesModule)},
    {path: 'accounts', loadChildren: () => import('./modules/accounts.module').then(m => m.AccountsModule)},
    {path: 'teams', loadChildren: () => import('./modules/teams.module').then(m => m.TeamsModule)},
    {path: 'doodles', loadChildren: () => import('./modules/doodles.module').then(m => m.DoodlesModule)},
    {path: 'password', loadChildren: () => import('./modules/password.module').then(m => m.PasswordModule)},
    {path: 'manofthematch', loadChildren: () => import('./modules/motm.module').then(m => m.MotmModule)},
    {path: 'statistics', loadChildren: () => import('./modules/statistics.module').then(m => m.StatisticsModule)},
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
        BrowserAnimationsModule,
        AlertModule.forRoot(),
        BsDropdownModule.forRoot(),
        CollapseModule.forRoot(),
        TabsModule.forRoot(),
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
        }),
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
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
