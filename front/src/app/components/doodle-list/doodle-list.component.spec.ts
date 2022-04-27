import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoodleListComponent } from './doodle-list.component';

describe('DoodleListComponent', () => {
  let component: DoodleListComponent;
  let fixture: ComponentFixture<DoodleListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoodleListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoodleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
