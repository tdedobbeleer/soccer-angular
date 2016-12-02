import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-message',
  template: `
    <div class="post">
      <div>
        <h4>
            <span>{{message.header}}</span>
        </h4>
        <hr>
        <span align="left" [innerHTML]="message.content"></span>
      
        <div class="author-category">Posted by
            {{message.postedBy.name}} on
            {{message.postDate}}
        </div>
      </div>
      <div class="m-t-1">
        <app-comment-list [commentList]="message?.comments"></app-comment-list>
      </div>
    </div>
  `,
  styles: []
})
export class MessageComponent implements OnInit {
  @Input() message;

  constructor() { }

  ngOnInit() {
  }

}
