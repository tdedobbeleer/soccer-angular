import {Component, OnInit, Input} from "@angular/core";
import {CommentDTO} from "../../ws/soccer/model/CommentDTO";
import {CommentsrestcontrollerApi} from "../../ws/soccer/api/CommentsrestcontrollerApi";
import {SecUtil} from "../../classes/sec-util";
import {ErrorHandlerService} from "../../services/error-handler.service";

@Component({
    selector: 'app-comment',
    template: `
    <div class="comment" *ngIf="comment">
        <div *ngIf="!showEditComment" class="row" (mouseover)="showBtns = true" (mouseleave)="showBtns = false">
          <div class="col-md-10">
          <i class="fa fa-2x fa-comment"></i>
          <span>{{comment?.content}} -
              {{'text.by' | translate}}&nbsp;{{comment?.postedBy?.name}}&nbsp;{{'text.on' | translate}}&nbsp;{{comment?.postDate}}
          </span>
          </div>
          <div class="col-md-2">
           <span class="btn-group pull-right" *ngIf="showBtns && isLoggedIn() && (getUser().username == comment?.postedBy?.username || isAdmin())">
                  <button type="button" class="btn btn-warning" aria-label="Delete comment" (click)="deleteComment(comment)">
                      <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                  </button>
                  <button type="button" class="btn" aria-label="Edit comment" (click)="showEditComment = !showEditComment">
                      <span class="glyphicon glyphicon-edit" aria-hidden="true"></span>
                  </button>
          </span>
          </div>
        
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
    private showBtns: boolean;

    constructor(private _errorHandler: ErrorHandlerService, private _api: CommentsrestcontrollerApi) {
    }

    ngOnInit() {
    }

    isLoggedIn() {
        return SecUtil.isLoggedIn();
    }

    isAdmin() {
        return SecUtil.isAdmin();
    }

    getUser() {
        return SecUtil.getUser();
    }

    updateComment(comment: CommentDTO) {
        this.showEditComment = false;
        this._api.editComment(this.messageId, comment, SecUtil.getJwtHeaders())
            .subscribe(r => {
                console.log("success");
                this.comment.content = comment.content;
                },
                e => {
                    this._errorHandler.handle(e);
            })
    }

    deleteComment(comment: CommentDTO) {
        this.showEditComment = false;
        this._api.deleteComment(this.messageId, comment.id, SecUtil.getJwtHeaders())
            .subscribe(
                r => {
                console.log("success");
                this.comment = null;
                },
                e => {
                    this._errorHandler.handle(e);
                }
            )
    }

}
