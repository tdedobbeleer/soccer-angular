import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoodleComponent } from './doodle.component';

describe('DoodleComponent', () => {
  let component: DoodleComponent;
  let fixture: ComponentFixture<DoodleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoodleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoodleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
