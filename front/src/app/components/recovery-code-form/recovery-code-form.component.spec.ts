import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoveryCodeFormComponent } from './recovery-code-form.component';

describe('RecoveryCodeFormComponent', () => {
  let component: RecoveryCodeFormComponent;
  let fixture: ComponentFixture<RecoveryCodeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecoveryCodeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecoveryCodeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
