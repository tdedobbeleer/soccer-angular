import {Component, Inject, Input, OnInit} from '@angular/core';
import {LoginService} from '../../services/login.service';
import {ErrorHandlerService} from '../../services/error-handler.service';
import {SecUtil} from '../../classes/sec-util';
import {CommentDTO, CommentsRestControllerService, NewsDTO, NewsRestControllerService} from '../../ws/soccer';
import {DOCUMENT} from '@angular/common';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-message',
    template: `
        <div class="post" *ngIf="message && !deleted">
      <div>
        <div class="row">
            <div class="col-md-12 text-center"><h4>{{message.header}}</h4></div>
        </div>
        <hr>
          <div class="row">
              <div class="col-md-12">
                  <span class="message-content" [innerHTML]="message.content | safeHtml"></span>

                  <div class="author-category">{{'text.message.postedBy' | translate}}&nbsp;{{message.postedBy.name}}&nbsp;{{'text.on' | translate}}&nbsp;{{message.postDate}}
                      <span class="btn-group"
                            *ngIf="isLoggedIn() && (isAdmin() || message.postedBy.id == getUser().id)">
                <button type="button" class="btn btn-sm" aria-label="Edit" [routerLink]="['/messages/edit/' + message.id]" routerLinkActive="active" title="{{'tooltip.news.edit' | translate}}">
                    <span class="fa fa-edit" aria-hidden="true"></span>
                </button>
                <button type="button" class="btn btn-sm btn-warning" aria-label="Delete" (click)="showDeleteNews = !showDeleteNews" title="{{'tooltip.news.delete' | translate}}">
                    <span class="fa fa-trash" aria-hidden="true"></span>
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
                          <app-comment-form (onSubmit)="createComment($event)"
                                            [comment]="getNewComment(message.id)"></app-comment-form>    
                      </span>
                      </div>
                      <div class="m-t-1" *ngIf="showAllComments">
                          <app-comment *ngFor="let c of message?.comments" [comment]="c"
                                       [messageId]="message.id"></app-comment>
                      </div>
                      <div class="comment"
                           *ngIf="!showCreateComment && showAllComments && message?.comments?.length == 0">
                          <div class="m-t-1 row">
                              <div class="col-md-10"><i
                                      class="fa fa-2x fa-comment">&nbsp;</i><b>{{'text.no.comments' | translate}}</b>
                              </div>
                          </div>
                      </div>
                  </div>

                  <div class="pull-right">
                <span class="btn-group m-t-1" *ngIf="isLoggedIn() && showAllComments">
                    <button type="button" class="btn btn-info" aria-label="Create comment"
                            (click)="showCreateComment = !showCreateComment" title="{{'tooltip.comments.add' | translate}}">
                        <span class="fa fa-plus" aria-hidden="true"></span>
                    </button>
                </span>
                  </div>
              </div>
          </div>
          <div class="row m-t-1">
              <div class="col-md-12">
                  <div class="text-center">
                      <div id="messageBtns">
                          <span [@shareState]="shareStateStatus">
                            <button class="btn btn-link" shareButton="facebook" [url]="messageUrl"
                                    [title]="message.header" [description]="shortMessage">
                              <i class="fa fa-facebook fa-2x facebook"></i>
                            </button>
                            <button class="btn btn-link" shareButton="whatsapp" [url]="messageUrl"
                                    [description]="message.header">
                                <i class="fa fa-whatsapp fa-2x whatsapp"></i>
                            </button>
                            <button class="hidden-lg btn btn-link" shareButton="email" [url]="messageUrl"
                                    [title]="message.header"
                                    [description]="shortMessage">
                                <i class="fa fa-envelope-o fa-2x email"></i>
                            </button>
                            <button class="visible-lg-inline btn btn-link"><a
                                    [href]="'mailto:?&subject=' + this.message.header + '&body=' + this.shortMessage + '%0D%0A' + this.messageUrl"><i
                                    class="fa fa-envelope-o fa-2x email"></i></a></button>
                          </span>
                          <button class="btn btn-link" title="Share" (click)="toggleShareState()"
                                  *ngIf="shareStateStatus == 'inactive'">
                              <i class="fa fa-share-alt fa-2x"></i>
                          </button>
                          <button class="btn btn-link commentBtn" (click)="showAllComments = !showAllComments"  title="{{'tooltip.comments' | translate}}">
                              <i class="fa fa-comments fa-2x"></i><i
                                  class="badge">{{message?.comments.length}}</i>
                          </button>
                      </div>
                  </div>
              </div>
          </div>
      </div>   
         <div class="clearfix"></div>
    </div>
  `,
    styles: [
            `
            #messageBtns .btn {
                padding: 1px;
                color: #333;
            }

            .facebook {
                color: #3b5998;
            }

            .whatsapp {
                color: #25d366;
            }

            .email {
                color: #337ab7;
            }

        `
    ],
    animations: [
        trigger('shareState', [
            state('active', style({opacity: 1})),
            state('inactive', style({opacity: 0, display: 'none'})),
            transition('active => inactive', animate('600ms')),
            transition('inactive => active', animate('300ms')),
        ])
    ]
})
export class MessageComponent implements OnInit {
  @Input() message: NewsDTO;

  showAllComments: boolean = false;
  showCreateComment: boolean = false;
  showDeleteNews: boolean = false;
  deleted: boolean = false;
    messageUrl: string;
    shortMessage: string;
    shareStateStatus: string = 'inactive';

    constructor(@Inject(DOCUMENT) private _document: any, private _api: CommentsRestControllerService, private _messagesApi: NewsRestControllerService, private _loginService: LoginService,
                private _errorHandler: ErrorHandlerService) {
  }

  ngOnInit() {
      this.messageUrl = this._document.location.origin + "/messages/" + this.message.id;
      this.shortMessage = this.stripHtml(this.message.content.length > 100 ? this.message.content.substring(0, 100) + ' ...' : this.message.content);
  }

    toggleShareState() {
        this.shareStateStatus = this.shareStateStatus == 'active' ? 'inactive' : "active";
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

      this._api.postComment(comment, comment.id)
        .subscribe(r => {
          console.log("success");
              this.message.comments.push(r);
              this.showAllComments = true;
            },
            error => {
              this._errorHandler.handle(error, "messages");
        })
  }

    private stripHtml(code: string) {
        return code.replace(/<.*?>/g, '');
    }
}
