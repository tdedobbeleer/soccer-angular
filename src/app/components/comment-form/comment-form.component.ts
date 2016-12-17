import {Component, OnInit, Input, EventEmitter, Output} from "@angular/core";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {CommentDTO} from "../../ws/model/CommentDTO";

@Component({
  selector: 'app-comment-form',
  template: `
 <form [formGroup]="messageForm" novalidate (ngSubmit)="submit(messageForm.value, messageForm.valid)">
      <div class="form-group">
         <input type="text" class="form-control" [formControl]="messageForm.controls['content']">
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
  @Input() comment: string;

  @Output() onSubmit = new EventEmitter<any>();

  public messageForm: FormGroup;
  public submitted: boolean;

  constructor(private _fb: FormBuilder) {

  }

  ngOnInit() {
    // the short way
    this.messageForm = this._fb.group({
      content: ['', [<any>Validators.required]],
    });
    this.messageForm.patchValue({content: this.comment});
  }

  submit(model: CommentDTO, isValid: boolean) {
    this.submitted = true;
    if (isValid) {
      this.onSubmit.emit(model);
    }
    console.log(model, isValid);
  }


}
