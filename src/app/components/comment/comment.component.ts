import {Component, OnInit, Input} from "@angular/core";
import {CommentDTO} from "../../ws/soccer/model/CommentDTO";
import {LoginService} from "../../services/login.service";
import {CommentsrestcontrollerApi} from "../../ws/soccer/api/CommentsrestcontrollerApi";

@Component({
    selector: 'app-comment',
    template: `
    <div class="comment post" *ngIf="comment !== null">
        <div *ngIf="!showEditComment">
          <span>{{comment?.content}} -
              {{'text.by' | translate}}&nbsp;{{comment?.postedBy?.name}}&nbsp;{{'text.on' | translate}}&nbsp;{{comment?.postDate}}
          </span>
           <span class="btn-group pull-right" *ngIf="isLoggedIn() && (getUser().username == comment?.postedBy?.username || isAdmin())">
                  <button type="button" class="btn btn-warning btn-circle" aria-label="Delete comment" (click)="deleteComment(comment)">
                      <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                  </button>
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
    </div>
  `,
    styles: []
})
export class CommentComponent implements OnInit {
    @Input() comment: CommentDTO;
    @Input() messageId: number;

    private showEditComment: boolean;

    constructor(private _loginService: LoginService, private _api: CommentsrestcontrollerApi) {
    }

    ngOnInit() {
    }

    isLoggedIn() {
        return this._loginService.isLoggedIn();
    }

    isAdmin() {
        return this._loginService.isAdmin();
    }

    getUser() {
        return this._loginService.getUser();
    }

    updateComment(comment: CommentDTO) {
        this.showEditComment = false;
        this._api.editComment(this.messageId, comment, this._loginService.jwtHeader)
            .subscribe(r => {
                console.log("success");
                this.comment.content = comment.content;
            })
    }

    deleteComment(comment: CommentDTO) {
        this.showEditComment = false;
        this._api.deleteComment(this.messageId, comment.id, this._loginService.jwtHeader)
            .subscribe(r => {
                console.log("success");
                this.comment = null;
            })
    }

}
