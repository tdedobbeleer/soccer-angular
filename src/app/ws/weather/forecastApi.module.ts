import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';

import {ForecastRestControllerService} from "./api/forecastRestControllerService";
import {ForecastApiConfiguration} from "./forecastApiConfiguration";

@NgModule({
    imports: [CommonModule, HttpClientModule],
    declarations: [],
    exports: [],
    providers: [
        ForecastRestControllerService
    ]
})
export class ForecastApiModule {
    constructor(@Optional() @SkipSelf() parentModule: ForecastApiModule) {
        if (parentModule) {
            throw new Error('ForecastApiModule is already loaded. Import your base ForecastApiModule only.');
        }
    }

    public static forRoot(configurationFactory: () => ForecastApiConfiguration): ModuleWithProviders {
        return {
            ngModule: ForecastApiModule,
            providers: [{provide: ForecastApiConfiguration, useFactory: configurationFactory}]
        }
    }
}
