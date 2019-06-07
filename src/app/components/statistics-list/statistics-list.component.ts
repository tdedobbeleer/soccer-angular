import {Component, OnInit, ViewChild} from '@angular/core';
import {ErrorHandlerService} from '../../services/error-handler.service';
import {isNullOrUndefined} from 'util';
import {Subject} from 'rxjs/Rx';
import {DataTableDirective} from 'angular-datatables';
import {AccountStatisticDTO, SeasonDTO, SeasonsRestControllerService, StatisticsRestControllerService} from '../../ws/soccer';
import {SecUtil} from '../../classes/sec-util';
import * as FileSaver from 'file-saver';

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
      
        <div class="box" *ngIf="seasons?.length == 0">
            <p>{{'text.statistics.empty' | translate}}</p>
        </div>
        <div class="box" *ngIf="seasons?.length > 0">
            <div>
                <form class="form-inline">
                    <div class="form-group">
                        <label for="season">{{"label.match.season" | translate}}</label>
                        <select #selectedSeason name="season" class="form-control" (change)="getStatisticsForSeason(selectedSeason.value, false)">
                              <option *ngFor="let s of seasons" [value]="s.id" [selected]="seasons[0]?.id == s.id">{{s.description}}</option>
                        </select>
                    </div>
                    <a class="pull-right" (click)="exportStatistics()" *ngIf="isLoggedIn" title="{{'tooltip.statistics.download' | translate}}"><span class="glyphicon glyphicon-save-file fa-lg"></span></a>
                </form>
    
                
            </div>
            <div class="table-responsive">
            <table class="table table-striped" datatable [dtOptions]="dtOptions" [dtTrigger]="dtTrigger">
                <thead>
                <tr>
                    <th class="text-center">
                        {{'text.name' | translate}}
                    </th>
                    <th class="text-center" title="{{'tooltip.statistics.goals' | translate}}">
                        {{'text.statistics.goals' | translate}}
                    </th>
                    <th class="text-center" title="{{'tooltip.statistics.assists' | translate}}">
                        {{'text.statistics.assists' | translate}}
                    </th>
                    <th class="text-center" title="{{'tooltip.statistics.played' | translate}}">
                        {{'text.statistics.played' | translate}}
                    </th>
                    <th class="text-center" title="{{'tooltip.statistics.motm' | translate}}">
                        {{'text.statistics.motm' | translate}}
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr *ngFor="let stat of accountStatistics">
                    <td class="text-center">{{stat.account.name}}</td>
                    <td class="text-center">{{stat.goals}}</td>
                    <td class="text-center">{{stat.assists}}</td>
                    <td class="text-center">{{stat.played}}</td>
                    <td class="text-center">{{stat.motm}}</td>
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
    season : SeasonDTO;
    accountStatistics: AccountStatisticDTO[];
    dtOptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject();
    isLoggedIn: boolean;

    @ViewChild(DataTableDirective, {static: true})
    dtElement: DataTableDirective;

    constructor(private _api: StatisticsRestControllerService, private errorHandler: ErrorHandlerService, private _seasonsApi: SeasonsRestControllerService) {
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
                        this.getStatisticsForSeason(this.seasons[0], true);
                    }
                }, e => {
                    this.errorHandler.handle(e);
                }
            );
        this.isLoggedIn = SecUtil.isLoggedIn();

    }

    exportStatistics() {
        this._api.exportStatistics(this.season.id).subscribe((json) => {
            const s = atob(json.bytes);
            const blob = new Blob([s], {type: 'application/octet-stream'});
            FileSaver.saveAs(blob, 'stats_' + this.season.description + '.csv');
        });
    }

    getStatisticsForSeason(season: SeasonDTO, init: boolean) {

        this._api.getStatictics(season.id).subscribe(
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
                this.season = season;
            },
            e => {
                this.errorHandler.handle(e);
            }
        );
    }

}
