import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTeamComponent } from './edit-team.component';

describe('EditTeamComponent', () => {
  let component: EditTeamComponent;
  let fixture: ComponentFixture<EditTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
