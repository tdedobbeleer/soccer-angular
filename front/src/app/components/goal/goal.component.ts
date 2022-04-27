import {Component, Input, OnInit} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {AccountDTO} from "../../ws/soccer";
import {Util} from "../../classes/util";

@Component({
    selector: 'app-goal',
    template: `
    <div [formGroup]="goal" class="row">
        <input type="hidden" formControlName="order">
        <div class="form-group col-md-3">
          
          <select [compareWith]="isSelectedScorer" class="form-control" formControlName="scorer">
                <option [ngValue]="null" selected>{{'text.match.scorer' | translate}}</option>
                <option *ngFor="let p of players" [ngValue]="p">{{p.name}}</option>
          </select>
        </div>
        <div class="form-group col-md-3">
          <select [compareWith]="isSelectedAssist" class="form-control" formControlName="assist">
                <option [ngValue]="null" selected>{{'text.match.assist' | translate}}</option>
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
        if (Util.isNullOrUndefined(selected)) return Util.isNullOrUndefined(player);
        return selected.id == player.id;
    }

    isSelectedScorer(selected: any, player: any) {
        if (Util.isNullOrUndefined(selected)) return Util.isNullOrUndefined(player);
        return selected.id == player.id;
    }
}
