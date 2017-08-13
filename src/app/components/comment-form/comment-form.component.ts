import {Component, OnInit, Input, EventEmitter, Output} from "@angular/core";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {CommentDTO} from "../../ws/soccer/model/CommentDTO";

@Component({
  selector: 'app-comment-form',
  template: `
 <form [formGroup]="messageForm" novalidate (ngSubmit)="submit(messageForm.value, messageForm.valid)">
      <div class="form-group">
         <textarea rows="5" type="text" class="form-control" formControlName="content"></textarea>
         <small *ngIf="submitted && messageForm.controls.content.errors" class="text-danger">
                {{"validation.comment.empty" | translate}}
              </small>
      </div>       
      <div class="box-footer">
      <button type="submit" class="btn btn-primary">{{"btn.submit" | translate}}</button>
      </div>
    </form>
  `,
  styles: []
})
export class CommentFormComponent implements OnInit {
  @Input() comment: CommentDTO;

  @Output() onSubmit = new EventEmitter<any>();

  public messageForm: FormGroup;
  public submitted: boolean;

  constructor(private _fb: FormBuilder) {

  }

  ngOnInit() {
    // the short way
    this.messageForm = this._fb.group({
        id: ['', [<any>Validators.required]],
      content: ['', [<any>Validators.required]],
    });
      this.messageForm.patchValue({content: this.comment.content, id: this.comment.id});
  }

  submit(model: CommentDTO, isValid: boolean) {
    this.submitted = true;
    if (isValid) {
      this.onSubmit.emit(model);
    }
    console.log(model, isValid);
  }
}
