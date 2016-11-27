import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-message',
  template: `
    <div class="post">
      <h4>
          <span>{{message.header}}</span>
      </h4>
      <hr>
      <span align="left">{{message.content}}</span>
    
      <p class="author-category">Posted by
          {{message.postedBy.name}} on
          {{message.postDate}}
      </p>
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
