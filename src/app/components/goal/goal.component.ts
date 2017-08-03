import {Component, OnInit, Input} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {AccountDTO} from "../../ws/soccer/model/AccountDTO";

@Component({
    selector: 'app-goal',
    template: `
    <div [formGroup]="goal" class="row">
        <input type="hidden" formControlName="order">
        <div class="form-group col-md-3">
          
          <select class="form-control" formControlName="scorer">
                <option value="null" disabled selected>{{'text.match.scorer' | translate}}</option>
                <option *ngFor="let p of players" [value]="p" [selected]="goal.value.scorer?.id == p.id">{{p.name}}</option>
          </select>
        </div>
        <div class="form-group col-md-3">
          <select class="form-control" formControlName="assist">
                <option value="null" disabled selected>{{'text.match.assist' | translate}}</option>
                <option *ngFor="let p of players" [value]="p" [selected]="goal.value.assist?.id == p.id">{{p.name}}</option>
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
        //console.log("Goal " + JSON.stringify(this.goal.value));
    }

}
