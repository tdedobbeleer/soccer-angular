import {Component, OnInit} from "@angular/core";
import {MatchesrestcontrollerApi} from "../../ws/soccer/api/MatchesrestcontrollerApi";
import {ForecastrestcontrollerApi} from "../../ws/weather/api/ForecastrestcontrollerApi";
import {TranslationService} from "../../services/translation.service";
import {Util} from "../../classes/util";
import {WeatherList} from "../../ws/weather/model/bundled";
import {MatchDTO} from "../../ws/soccer/model/MatchDTO";

@Component({
    selector: 'app-next-match',
    template: `
    <h3>{{'text.match.next' | translate}}</h3>
    <div class="box" *ngIf="match">
        <div class="row visible-xs text-center">
            <div class="col-xs-12"><h3><span class="glyphicon glyphicon-calendar" aria-hidden="true"></span>&nbsp;{{match?.date}}</h3></div>
        </div>
        <div class="row">
            <div class="col-md-12 col-xs-12">
                <div class="row">
                    <div class="col-md-3 col-sm-12 col-xs-12 hidden-xs"><h4><span class="glyphicon glyphicon-calendar" aria-hidden="true"></span>&nbsp;{{match?.date}}</h4></div>
                    <div class="col-md-6">
                        <div class="row text-center">
                            <div class="col-md-4 col-xs-4 right"><h3>{{match?.homeTeam?.name}}</h3></div>
                            <div class="col-md-2 col-xs-4 text-center score"><h3> - </h3></div>
                            <div class="col-md-4 col-xs-4 left"><h3>{{match?.awayTeam?.name}}</h3></div>
                        </div>
                    </div>
                    <div class="col-md-3 col-xs-12 col-sm-12">
                      <div class="row text-center visible-sm visible-xs">
                          <h3><span class="glyphicon glyphicon-time" aria-hidden="true"></span>&nbsp;{{match?.hour}}</h3>
                      </div>
                      <div *ngIf="forecast" class="text-center">
                          <div class="row">
                          <div class="col-md-12">
                               <img [src]="getWeatherIcon(forecast?.weather[0]?.icon) | safe"/>
                          </div>
                          </div>
                          <div class="row">
                              <div class="col-md-12">
                                  <h4>{{this.math.floor(forecast.main.temp)}}°</h4>
                                  {{forecast.weather[0].description}}    
                              </div>
                          </div>  
                      </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row text-center hidden-sm hidden-xs">
            <div class="col-md-8 col-md-offset-2 col-xs-12">
                <div class="row">
                    <div class="col-md-2 col-md-offset-4 col-xs-offset-4 col-xs-4 text-center">
                        <h3><span class="glyphicon glyphicon-time" aria-hidden="true"></span>&nbsp;{{match?.hour}}</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
  `,
    styles: []
})
export class NextMatchComponent implements OnInit {
    match: MatchDTO;
    forecast: WeatherList;
    math: Math;

    constructor(private _matchesApi: MatchesrestcontrollerApi,
                private _forecastApi: ForecastrestcontrollerApi,
                private _translationService: TranslationService) {
        this.math = Math;
    }

    ngOnInit() {
        this.getNextMatch(this._translationService.currentLang());
        this._translationService.langUpdated.subscribe(l => this.getNextMatch(l))
    }

    getNextMatch(lang: any) {
        this._matchesApi.nextMatchPoll().subscribe(m => {
            if (m) {
                this.match = m;
                let matchDate = Util.parseTime(m.date, m.hour);
                this._forecastApi.getForecast(lang, m.address.postalCode).subscribe(
                    f => {
                        for (let weather of f.list) {
                            let weatherDate = Util.parseUnixDate(weather.dt);
                            if (m.date == Util.parseDate(weatherDate)) {
                                if (Util.dateTimeIsBetween(matchDate, weatherDate, 120)) {
                                    this.forecast = weather;
                                    break;
                                }
                            }
                        }
                    },
                    e => console.log('Weather not fetched: %s', e),
                );
            }
        });
    }

    getWeatherIcon(iconName) {
        return "http://openweathermap.org/img/w/" + iconName + ".png"
    }

}
