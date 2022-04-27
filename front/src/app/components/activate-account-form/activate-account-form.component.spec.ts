import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {ActivateAccountFormComponent} from "./activate-account-form.component";

describe('ActivateAccountFormComponent', () => {
    let component: ActivateAccountFormComponent;
    let fixture: ComponentFixture<ActivateAccountFormComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ActivateAccountFormComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ActivateAccountFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
