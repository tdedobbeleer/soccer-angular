import {Component, OnInit} from "@angular/core";
import {TranslationService} from "../../services/translation.service";
import {Util} from "../../classes/util";
import {ForecastRestControllerService, WeatherList} from "../../ws/weather";
import {SecUtil} from "../../classes/sec-util";
import {MatchDTO, MatchesRestControllerService} from "../../ws/soccer";

@Component({
    selector: 'app-next-match',
    template: `
        <div class="text-center" *ngIf="match">
            <h3 *ngIf="match?.status != matchStatus.PLAYED">{{'text.match.next' | translate}}
                <span *ngIf="match?.status == matchStatus.CANCELLED" class="red" data-toggle="tooltip"
                      data-placement="top"
                      title="{{match?.statusText}}">&nbsp;({{'text.match.status.cancelled' | translate}}!)</span>
            </h3>

        </div>
        <div class="box" *ngIf="match" [ngClass]="{'cancelled': match?.status == matchStatus.CANCELLED }">
        <div class="row">
            <div class="col-md-12 col-xs-12">
                <div class="row">
                    <div class="col-md-3 col-sm-12 col-xs-12 hidden-xs"><h4><span class="glyphicon glyphicon-calendar" aria-hidden="true"></span>&nbsp;{{match?.date}}</h4></div>
                    <div class="col-md-7">
                        <div class="row text-center hidden-xs">
                            <div class="col-md-4 col-xs-4 right"><h3>{{match?.homeTeam?.name}}</h3></div>
                            <div class="col-md-2 col-xs-4 text-center score" *ngIf="match.status != matchStatus.PLAYED"><h3> - </h3></div>
                            <div class="col-md-2 col-xs-4 text-center score" *ngIf="match.status == matchStatus.PLAYED">
                            <h3>{{match.htGoals}} - {{match.atGoals}}</h3></div>
                            <div class="col-md-4 col-xs-4 left"><h3>{{match?.awayTeam?.name}}</h3></div>
                        </div>
                         <div class="row visible-xs">
                            <div class="col-xs-8">
                            <div class=""><h4>{{match?.homeTeam?.name}} <span class="pull-right" *ngIf="match.status == matchStatus.PLAYED">{{match.htGoals}}</span></h4></div>
                            <div class=""><h4>{{match?.awayTeam?.name}} <span class="pull-right" *ngIf="match.status == matchStatus.PLAYED">{{match.atGoals}}</span></h4></div>
                            </div>
                            <div class="col-xs-4">
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
                    <div class="col-md-2 col-xs-12 col-sm-12">
                      <div class="row text-center visible-sm visible-xs">
                          <h5><span class="glyphicon glyphicon-calendar" aria-hidden="true"></span>&nbsp;{{match?.date}} - {{match?.hour}}</h5>
                          <h5>
                              <a *ngIf="match.address?.googleLink" (click)="showMap = !showMap"><span class="glyphicon glyphicon-map-marker" aria-hidden="true"></span>&nbsp;{{match.address.address}},&nbsp;{{match.address.city}}</a>
                              <span *ngIf="!match.address?.googleLink"><span class="glyphicon glyphicon-home" aria-hidden="true"></span>&nbsp;{{match.address.address}},&nbsp;{{match.address.city}}</span>
                          </h5>
                      </div>
                      <div *ngIf="forecast" class="text-center hidden-xs">
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
        <div class="row hidden-sm hidden-xs">
            <div class="col-md-12 col-xs-12">
               <div class="text-center">
                    <h3><span class="glyphicon glyphicon-time" aria-hidden="true"></span>&nbsp;{{match?.hour}}</h3>
                    <h3>
                        <a *ngIf="match.address?.googleLink" (click)="showMap = !showMap"><span class="glyphicon glyphicon-map-marker" aria-hidden="true"></span>&nbsp;{{match.address.address}},&nbsp;{{match.address.city}}</a>
                        <span *ngIf="!match.address?.googleLink"><span class="glyphicon glyphicon-home" aria-hidden="true"></span>&nbsp;{{match.address.address}},&nbsp;{{match.address.city}}</span>
                    </h3>
               </div>
            </div>
        </div>
        <div class="row">
        <div class="text-center">
                  <div class="btn-group">
                      <button *ngIf="match.hasDoodle && isAdmin()" type="button" class="btn btn-sm" aria-label="Doodle"
                              [routerLink]="['/doodles', match.id]">
                          <span class="glyphicon glyphicon-user" aria-hidden="true"></span>
                      </button>
                          <button type="button" *ngIf="isAdmin()" class="btn btn-sm btn-warning" aria-label="Edit match" [routerLink]="['/matches/edit', match.id]">
                            <span class="glyphicon glyphicon-edit" aria-hidden="true"></span>
                          </button>
                      </div>
                 </div>
        </div>
        <div class="row">
             <div class="col-md-12 google-map">
                <div *ngIf="showMap">
                    <iframe id="mapFrame" width="100%" height="450" scrolling="no" marginheight="0" marginwidth="0" [src]="match.address?.googleLink | safe" frameborder="0"></iframe>
                </div> 
            </div>
        </div>
    </div>
  `,
    styles: [`
        .box.cancelled {
            border: solid 1px indianred;
        }
    `
    ]
})
export class NextMatchComponent implements OnInit {
    match: MatchDTO;
    forecast: WeatherList;
    math: Math;
    matchStatus = MatchDTO.StatusEnum;

    constructor(private _matchesApi: MatchesRestControllerService,
                private _forecastApi: ForecastRestControllerService,
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

    isAdmin() {
        return SecUtil.isAdmin();
    }

}
