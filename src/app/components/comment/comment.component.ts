import {Component, Input, OnInit} from '@angular/core';
import {SecUtil} from '../../classes/sec-util';
import {ErrorHandlerService} from '../../services/error-handler.service';
import {CommentDTO, CommentsRestControllerService} from '../../ws/soccer';

@Component({
    selector: 'app-comment',
    template: `
    <div class="comment" *ngIf="comment">
        <div *ngIf="!showEditComment" class="row" (mouseover)="showBtns = true" (mouseleave)="showBtns = false">
          <div class="col-md-10">
          <i class="fa fa-2x fa-comment"></i>&nbsp;
          <span class="comment-content">{{comment?.content}}&nbsp;-&nbsp;{{'text.by' | translate}}&nbsp;{{comment?.postedBy?.name}}&nbsp;{{'text.on' | translate}}&nbsp;{{comment?.postDate}}
          </span>
          </div>
          <div class="col-md-2">
           <span class="btn-group pull-right" *ngIf="showBtns && isLoggedIn() && (getUser().id == comment?.postedBy?.id || isAdmin())">
                  <button type="button" class="btn btn-warning" aria-label="Delete comment" (click)="deleteComment(comment)" title="{{'tooltip.comments.delete' | translate}}">
                      <span class="fa fa-trash" aria-hidden="true"></span>
                  </button>
                  <button type="button" class="btn" aria-label="Edit comment" (click)="showEditComment = !showEditComment" title="{{'tooltip.comments.edit' | translate}}">
                      <span class="fa fa-edit" aria-hidden="true"></span>
                  </button>
          </span>
          </div>
        
        </div>
        <span class="m-t-1" *ngIf="showEditComment && isLoggedIn() && (isAdmin() || getUser().username == comment?.postedBy?.username)">
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

    constructor(private _errorHandler: ErrorHandlerService, private _api: CommentsRestControllerService) {
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
        this._api.editComment(comment, this.messageId)
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
        this._api.deleteComment(this.messageId, comment.id)
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
