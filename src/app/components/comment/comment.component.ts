import {Component, OnInit, Input, EventEmitter, Output} from "@angular/core";
import {CommentDTO} from "../../ws/model/CommentDTO";
import {LoginService} from "../../services/login.service";

@Component({
    selector: 'app-comment',
    template: `
    <div *ngIf="!showEditComment">
      <span>{{comment?.content}} -
          {{'text.by' | translate}}&nbsp;{{comment?.postedBy?.name}}&nbsp;{{'text.on' | translate}}&nbsp;{{comment?.postDate}}
      </span>
      <span class="btn-group pull-right">
              <button type="button" class="btn btn-circle" aria-label="Edit comment" (click)="showEditComment = !showEditComment">
                  <span class="glyphicon glyphicon-edit" aria-hidden="true"></span>
              </button>
      </span>
    </div>
    <span class="m-t-1" *ngIf="showEditComment && isLoggedIn() && getUser().username == comment?.postedBy?.username">
        <app-comment-form (onSubmit)="submit($event)" [comment]="comment"></app-comment-form>    
    </span>
  `,
    styles: []
})
export class CommentComponent implements OnInit {
    @Input() comment: CommentDTO;
    @Output() onSubmit = new EventEmitter<any>();

    constructor(private _loginService: LoginService) {
    }

    ngOnInit() {
    }

    isLoggedIn() {
        return this._loginService.isLoggedIn();
    }

    getUser() {
        return this._loginService.getUser();
    }

    updateComment(comment: CommentDTO) {
        this.onSubmit.emit(comment);
    }

}
