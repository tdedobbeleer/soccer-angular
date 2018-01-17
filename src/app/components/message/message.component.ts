import {Component, Input, OnInit} from "@angular/core";
import {LoginService} from "../../services/login.service";
import {ErrorHandlerService} from "../../services/error-handler.service";
import {SecUtil} from "../../classes/sec-util";
import {CommentDTO, CommentsRestControllerService, NewsDTO, NewsRestControllerService} from "../../ws/soccer";

@Component({
  selector: 'app-message',
    template: `
        <div class="post" *ngIf="message && !deleted">
      <div>
        <div class="row">
            <div class="col-md-10 text-center"><h4>{{message.header}}</h4></div>
            <div class="col-md-2">
            <span class="pull-right">
                <a class="commentBtn" (click)="showAllComments = !showAllComments"><h5>
                {{'btn.reactions' | translate}}&nbsp;<span class="badge">{{message?.comments.length}}</span></h5></a>
            </span>
            </div>
        </div>
        <hr>
        <span class="message-content" [innerHTML]="message.content | safeHtml"></span>
      
        <div class="author-category">Posted by
            {{message.postedBy.name}} on
            {{message.postDate}}
            <span class="btn-group" *ngIf="isLoggedIn() && (isAdmin() || message.postedBy.id == getUser().id)">
                <button type="button" class="btn btn-sm" aria-label="Edit" [routerLink]="['/messages/edit/' + message.id]" routerLinkActive="active">
                    <span class="glyphicon glyphicon-edit" aria-hidden="true"></span>
                </button>
                <button type="button" class="btn btn-sm btn-warning" aria-label="Delete" (click)="showDeleteNews = !showDeleteNews">
                    <span class="glyphicon glyphicon-trash" aria-hidden="true"></span>
                </button>
            </span>  
            
        </div>
        <div class="m-t-1 text-center" *ngIf="showDeleteNews">
            <b>{{"text.verification.delete.news" | translate}}</b> 
            <span class="btn-group btn-group-xs">
              <button class="btn btn-xs" (click)="deleteMessage()"><b>{{"text.yes" | translate}}</b></button>
              <button class="btn btn-xs" (click)="showDeleteNews = false"><b>{{"text.no" | translate}}</b></button>
            </span>
        </div>
        <div class="m-t-1">
        <div *ngIf="showCreateComment">
          <span class="m-t-1">
              <app-comment-form (onSubmit)="createComment($event)" [comment]="getNewComment(message.id)"></app-comment-form>    
          </span>
        </div>
        <div class="m-t-1" *ngIf="showAllComments">
            <app-comment *ngFor="let c of message?.comments" [comment]="c" [messageId]="message.id"></app-comment>
        </div>
        <div class="comment" *ngIf="!showCreateComment && showAllComments && message?.comments?.length == 0">
          <div class="m-t-1 row">
              <div class="col-md-10"><i class="fa fa-2x fa-comment">&nbsp;</i><b>{{'text.no.comments' | translate}}</b></div>
          </div>
        </div>
      </div>
      
        <div class="pull-right">
        <span class="btn-group m-t-1" *ngIf="isLoggedIn() && showAllComments">
            <button type="button" class="btn btn-info" aria-label="Create comment" (click)="showCreateComment = !showCreateComment">
                <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
            </button>
        </span>  
        </div>
      </div>   
         <div class="clearfix"></div>
    </div>
  `,
  styles: []
})
export class MessageComponent implements OnInit {
  @Input() message: NewsDTO;

  showAllComments: boolean = false;
  showCreateComment: boolean = false;
  showDeleteNews: boolean = false;
  deleted: boolean = false;

    constructor(private _api: CommentsRestControllerService, private _messagesApi: NewsRestControllerService, private _loginService: LoginService,
                private _errorHandler: ErrorHandlerService) {
  }

  ngOnInit() {
  }

  isAdmin() {
    return SecUtil.isAdmin();
  }

  getUser() {
    return SecUtil.getUser();
  }

  isLoggedIn() {
      return SecUtil.isLoggedIn();
  }

  getNewComment(id: any) {
    return {id: id, content: ""}
  }

  deleteMessage() {
      this._messagesApi.deleteNews(this.message.id).subscribe(
        r => {
          this.deleted = true;
        },
        e => {
          this._errorHandler.handle(e);
        }
    )
  }

  createComment(comment: CommentDTO) {
    this.showCreateComment = false;

      this._api.postComment(comment.id, comment)
        .subscribe(r => {
          console.log("success");
              this.message.comments.push(r);
              this.showAllComments = true;
            },
            error => {
              this._errorHandler.handle(error, "messages");
        })
  }
}
