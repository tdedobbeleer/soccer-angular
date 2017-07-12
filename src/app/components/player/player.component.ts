import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-player',
  template: `
    <p>
      player Works!
    </p>
  `,
  styles: []
})
export class PlayerComponent implements OnInit {
  @Input() team: ProfileDTO;

  constructor() { }

  ngOnInit() {
  }

}
