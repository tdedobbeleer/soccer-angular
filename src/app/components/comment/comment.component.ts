import {Component, OnInit, Input} from "@angular/core";
import {CommentDTO} from "../../ws/model/CommentDTO";
import {LoginService} from "../../services/login.service";
import {CommentsrestcontrollerApi} from "../../ws/api/CommentsrestcontrollerApi";

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
        <app-comment-form (onSubmit)="updateComment($event)" [comment]="comment"></app-comment-form>    
    </span>
  `,
    styles: []
})
export class CommentComponent implements OnInit {
    @Input() comment: CommentDTO;

    private showEditComment: boolean;

    constructor(private _loginService: LoginService, private _api: CommentsrestcontrollerApi) {
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
        this.showEditComment = false;
        this._api.editComment(comment.id, comment, this._loginService.jwtHeader)
            .subscribe(r => {
                console.log("success")
            })
    }

}
