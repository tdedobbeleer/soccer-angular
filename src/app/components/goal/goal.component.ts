import {Component, OnInit, Input} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {AccountDTO} from "../../ws/soccer/model/AccountDTO";
import {isNullOrUndefined} from "util";

@Component({
    selector: 'app-goal',
    template: `
    <div [formGroup]="goal" class="row">
        <input type="hidden" formControlName="order">
        <div class="form-group col-md-3">
          
          <select [compareWith]="isSelectedScorer" class="form-control" formControlName="scorer">
                <option [ngValue]="null" selected disabled >{{'text.match.scorer' | translate}}</option>
                <option *ngFor="let p of players" [ngValue]="p">{{p.name}}</option>
          </select>
        </div>
        <div class="form-group col-md-3">
          <select [compareWith]="isSelectedAssist" class="form-control" formControlName="assist">
                <option [ngValue]="null" selected disabled>{{'text.match.assist' | translate}}</option>
                <option *ngFor="let p of players" [ngValue]="p">{{p.name}}</option>
          </select>
        </div>
    </div>
  `,
    styles: []
})
export class GoalsComponent implements OnInit {
    @Input('goal') public goal: FormGroup;
    @Input('players') public players: AccountDTO[];

    constructor() {

    }

    ngOnInit() {
    }

    isSelectedAssist(selected: any, player: any) {
        if (isNullOrUndefined(selected)) return isNullOrUndefined(player);
        return selected.id == player.id;
    }

    isSelectedScorer(selected: any, player: any) {
        if (isNullOrUndefined(selected)) return isNullOrUndefined(player);
        return selected.id == player.id;
    }
}
