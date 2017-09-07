import {Component, OnInit, Input} from "@angular/core";
import {CommentsrestcontrollerApi} from "../../ws/soccer/api/CommentsrestcontrollerApi";
import {CommentDTO} from "../../ws/soccer/model/CommentDTO";
import {LoginService} from "../../services/login.service";
import {NewsrestcontrollerApi} from "../../ws/soccer/api/NewsrestcontrollerApi";
import {ErrorHandlerService} from "../../services/error-handler.service";
import {NewsDTO} from "../../ws/soccer/model/NewsDTO";
import {SecUtil} from "../../classes/sec-util";

@Component({
  selector: 'app-message',
  template: `
    <div class="post" *ngIf="!deleted">
      <div>
        <h4>
            <span>{{message.header}}</span>
            <span class="pull-right">
                <a class="commentBtn" (click)="showAllComments = !showAllComments">
                {{'btn.reactions' | translate}}&nbsp;<span class="badge">{{message?.comments.length}}</span></a>
            </span>
        </h4>
        <hr>
        <span align="left" [innerHTML]="message.content | safeHtml"></span>
      
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
      
        <div class="pull-right">
        <span class="btn-group m-t-1" *ngIf="isLoggedIn() && showAllComments">
            <button type="button" class="btn btn-info" aria-label="Create comment" (click)="showCreateComment = !showCreateComment">
                <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
            </button>
        </span>  
        </div>
      </div>
       <div class="clearfix"></div>
      <div class="m-t-1">
        <div *ngIf="showCreateComment">
          <span class="m-t-1">
              <app-comment-form (onSubmit)="createComment($event)" [comment]="getNewComment(message.id)"></app-comment-form>    
          </span>
        </div>
        <div class="m-t-1" *ngIf="showAllComments">
            <app-comment *ngFor="let c of message?.comments" [comment]="c" [messageId]="message.id"></app-comment>
        </div>
      </div>
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

  constructor(private _api: CommentsrestcontrollerApi, private _messagesApi: NewsrestcontrollerApi, private _loginService: LoginService,
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
    this._messagesApi.deleteNews(this.message.id, SecUtil.getJwtHeaders()).subscribe(
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
      this._api.postComment(comment.id, comment, SecUtil.getJwtHeaders())
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
