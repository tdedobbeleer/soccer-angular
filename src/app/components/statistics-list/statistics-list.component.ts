import {Component, OnInit, ViewChild} from "@angular/core";
import {StatisticsrestcontrollerApi} from "../../ws/soccer/api/StatisticsrestcontrollerApi";
import {ErrorHandlerService} from "../../services/error-handler.service";
import {SeasonsrestcontrollerApi} from "../../ws/soccer/api/SeasonsrestcontrollerApi";
import {SeasonDTO} from "../../ws/soccer/model/SeasonDTO";
import {SecUtil} from "../../classes/sec-util";
import {AccountStatisticDTO} from "../../ws/soccer/model/AccountStatisticDTO";
import {isNullOrUndefined} from "util";
import {Subject} from "rxjs/Rx";
import {DataTableDirective} from "angular-datatables";

@Component({
    selector: 'app-statistics-list',
    template: `
    <div class="container">
        <ul class="breadcrumb">
            <li>
                <a [routerLink]="['/']" routerLinkActive="active"><span class="glyphicon glyphicon-home"></span>&nbsp;Home</a>
            </li>
            <li>
                {{'nav.statistics' | translate }}
            </li>
        </ul>
        <div class="box">
            <form class="form-inline">
                <div class="form-group">
                    <label for="season">{{"label.match.season" | translate}}</label>
                    <select #selectedSeason name="season" class="form-control" (change)="getStatisticsForSeason(selectedSeason.value, false)">
                          <option *ngFor="let s of seasons" [value]="s.id" [selected]="seasons[0]?.id == s.id">{{s.description}}</option>
                    </select>
                </div>
            </form>
           
            <div class="table-responsive">
            <table class="table table-striped" datatable [dtOptions]="dtOptions" [dtTrigger]="dtTrigger">
                <thead>
                <tr>
                    <th class="text-center">
                        {{'text.name' | translate}}
                    </th>
                    <th class="text-center">
                        {{'text.statistics.goals' | translate}}
                    </th>
                    <th class="text-center">
                        {{'text.statistics.assists' | translate}}
                    </th>
                    <th class="text-center">
                        {{'text.statistics.played' | translate}}
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr *ngFor="let stat of accountStatistics">
                    <td class="text-center">{{stat.account.name}}</td>
                    <td class="text-center">{{stat.goals}}</td>
                    <td class="text-center">{{stat.assists}}</td>
                    <td class="text-center">{{stat.played}}</td>
                </tr>
                </tbody>
                <tfoot>
                </tfoot>
            </table>
            </div>
        </div>
    </div>
  `,
    styles: []
})
export class StatisticsListComponent implements OnInit {
    seasons: SeasonDTO[];
    accountStatistics: AccountStatisticDTO[];
    dtOptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject();

    @ViewChild(DataTableDirective)
    dtElement: DataTableDirective;

    constructor(private _api: StatisticsrestcontrollerApi, private errorHandler: ErrorHandlerService, private _seasonsApi: SeasonsrestcontrollerApi) {
    }

    ngOnInit() {
        this.dtOptions = {
            paging: false,
            searching: false,
            info: false,
            order: [[1, "desc"]],
        };

        this._seasonsApi.getSeasons()
            .subscribe(s => {
                    this.seasons = s;
                    if (!isNullOrUndefined(s) && s.length > 0) {
                        this.getStatisticsForSeason(this.seasons[0].id, true);
                    }
                }, e => {
                    this.errorHandler.handle(e);
                }
            );

    }

    getStatisticsForSeason(seasonId: number, init: boolean) {
        this._api.getStatictics(seasonId, SecUtil.getJwtHeaders()).subscribe(
            r => {
                if (!init) {
                    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
                        // Destroy the table first
                        dtInstance.destroy();
                        this.accountStatistics = r;
                        // Call the dtTrigger to rerender again
                        this.dtTrigger.next();
                    });
                }
                else {
                    this.accountStatistics = r;
                    // Call the dtTrigger to rerender again
                    this.dtTrigger.next();
                }
            },
            e => {
                this.errorHandler.handle(e);
            }
        );
    }

}
