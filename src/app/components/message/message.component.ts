import {Component, OnInit, Input} from "@angular/core";
import {CommentsrestcontrollerApi} from "../../ws/api/CommentsrestcontrollerApi";
import {CommentDTO} from "../../ws/model/CommentDTO";

@Component({
  selector: 'app-message',
  template: `
    <div class="post">
      <div>
        <h4>
            <span>{{message.header}}</span>
        </h4>
        <hr>
        <span align="left" [innerHTML]="message.content"></span>
      
        <div class="author-category">Posted by
            {{message.postedBy.name}} on
            {{message.postDate}}
        </div>
      </div>
      <div class="m-t-1">
        <div class="comment post" *ngFor="let comment of message?.comments">
            <app-comment [comment]="comment" (onSubmit)="updateComment($event)"></app-comment>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class MessageComponent implements OnInit {
  @Input() message;

  constructor(private _api: CommentsrestcontrollerApi) {
  }

  ngOnInit() {
  }

  updateComment(comment: CommentDTO) {
    this._api.editComment(comment.id, comment)
        .subscribe(r => {
          console.log("success")
        })
  }

}
