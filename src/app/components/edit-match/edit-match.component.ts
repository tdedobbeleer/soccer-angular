import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {MatchDTO} from "../../ws/soccer/model/MatchDTO";
import {MatchesrestcontrollerApi} from "../../ws/soccer/api/MatchesrestcontrollerApi";
import {SecUtil} from "../../classes/sec-util";
import {ErrorHandlerService} from "../../services/error-handler.service";

@Component({
    selector: 'app-edit-match',
    template: `
    <div class="container">
      <app-match-form (match)="match" (update)="true"></app-match-form>
    </div>
  `,
    styles: []
})
export class EditMatchComponent implements OnInit {
    match: MatchDTO;

    constructor(private _route: ActivatedRoute, private _api: MatchesrestcontrollerApi, private _errorHandler: ErrorHandlerService) {
    }

    ngOnInit() {
        this._route.params.subscribe(params => {
            let id = params['id'];
            this._api.getMatch(id, SecUtil.getJwtHeaders()).subscribe(
                m => this.match = m,
                e => this._errorHandler.handle(e, "matches/edit/" + id)
            )
        });
    }

}
