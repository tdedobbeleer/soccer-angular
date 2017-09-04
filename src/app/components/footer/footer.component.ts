import {Component, OnInit} from "@angular/core";

@Component({
  selector: 'app-footer',
  template: `
  <div id="copyright">
      <div class="container">
          <div class="col-md-6">
            <a class="pull-left" href="https://github.com/tdedobbeleer">
                <img src="../../../assets/images/GitHub-Mark-Light-64px.png" alt="Obaju logo" class="hidden-xs">
                <img src="../../../assets/images/GitHub-Mark-Light-32px.png" alt="Obaju logo" class="visible-xs"><span class="sr-only">Go to homepage</span>
            </a>
          </div>
          <div class="col-md-6">
              <p class="pull-right">Template by <a href="http://www.bootstrapious.com">Responsive Templates</a> with
                  support from <a href="http://kakusei.cz">Designov&eacute; p&#345;edm&#283;ty</a>
                  <!-- Not removing these links is part of the licence conditions of the template. Thanks for understanding :) -->
              </p>
          </div>
      </div>
  </div>

  `,
  styles: []
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
