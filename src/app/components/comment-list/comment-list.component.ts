import {Component, OnInit, Input} from "@angular/core";
import {LoginService} from "../../services/login.service";
import {CommentsrestcontrollerApi} from "../../ws/api/CommentsrestcontrollerApi";
import {CommentDTO} from "../../ws/model/CommentDTO";

@Component({
  selector: 'app-comment-list',
  template: `
  <div class="comment post" *ngFor="let comment of commentList">
    <span>{{comment?.content}} -
        {{'text.by' | translate}}&nbsp;{{comment?.postedBy?.name}}&nbsp;{{'text.on' | translate}}&nbsp;{{comment?.postDate}}
    </span>
    <span *ngIf="isLoggedIn() && getUser().username == comment?.postedBy?.username">
        <app-comment-form (onSubmit)="updateComment($event)" [comment]="comment"></app-comment-form>    
    </span>
  </div>
  `,
  styles: []
})
export class CommentListComponent implements OnInit {
  @Input() commentList;

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
        this._api.editComment(comment.id, comment)
            .subscribe(r => {
                console.log("success")
            })
  }

}
