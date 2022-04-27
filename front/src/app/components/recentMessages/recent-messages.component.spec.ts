/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RecentMessagesComponent} from './recent-messages.component';

describe('MessagesComponent', () => {
  let component: RecentMessagesComponent;
  let fixture: ComponentFixture<RecentMessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RecentMessagesComponent]
    })
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
