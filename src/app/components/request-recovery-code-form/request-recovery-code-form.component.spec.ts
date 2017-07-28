import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestRecoveryCodeFormComponent } from './request-recovery-code-form.component';

describe('RequestRecoveryCodeFormComponent', () => {
  let component: RequestRecoveryCodeFormComponent;
  let fixture: ComponentFixture<RequestRecoveryCodeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestRecoveryCodeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestRecoveryCodeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
