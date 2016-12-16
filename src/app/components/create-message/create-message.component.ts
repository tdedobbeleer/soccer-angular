import {Component, OnInit} from "@angular/core";
import {Validators, FormBuilder, FormGroup} from "@angular/forms";
import {NewsDTO} from "../../ws/model/NewsDTO";

@Component({
    selector: 'app-create-message',
    template: `
<div class="box">
<h1>Add message</h1>
    
  <form [formGroup]="messageForm" novalidate (ngSubmit)="save(messageForm.value, messageForm.valid)">
    <div class="form-group">
      <label for="header">Title</label>
      <input type="text" class="form-control" [formControl]="messageForm.controls['header']">
      <small *ngIf="submitted && messageForm.controls.header.errors" class="text-danger">
            Title is required.
          </small>
    </div>
    <div class="form-group">
      <label for="content">Message</label>
      <app-tinymce [elementId]="'contentTinyMce'" (onEditorKeyup)="tinyMceCallback($event)"></app-tinymce>
      <small *ngIf="submitted && messageForm.controls.content.errors" class="text-danger">
              Content is required.
            </small>
      <input type="hidden" class="form-control" [formControl]="messageForm.controls['content']">
    </div>
    <div class="box-footer">
    <button type="submit" class="btn btn-default">Submit</button>
    </div>
  </form>
  </div>
  `,
    styles: []
})
export class CreateMessageComponent implements OnInit {

    public messageForm: FormGroup;
    public submitted: boolean;
    public events: any[] = [];

    constructor(private _fb: FormBuilder) {
    }

    ngOnInit() {
        // the short way
        this.messageForm = this._fb.group({
            header: ['', [<any>Validators.required]],
            content: ['', [<any>Validators.required]],
        });
    }

    save(model: NewsDTO, isValid: boolean) {
        this.submitted = true;
        console.log(model, isValid);
    }

    private tinyMceCallback(event) {
        this.messageForm.patchValue({content: event})
    }

}
