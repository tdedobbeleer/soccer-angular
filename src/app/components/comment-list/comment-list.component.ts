import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-comment-list',
  template: `
  <div class="comment post" *ngFor="let comment of commentList">
    <span>{{comment.content}} -
        By&nbsp;{{comment.postedBy.name}}&nbsp;on&nbsp;{{comment.postDate}}
    </span>
  </div>
  `,
  styles: []
})
export class CommentListComponent implements OnInit {
  @Input() commentList;

  constructor() { }

  ngOnInit() {
  }

}
