import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {EditAccountFormComponent} from "./edit-account-form.component";

describe('EditAccountFormComponent', () => {
    let component: EditAccountFormComponent;
    let fixture: ComponentFixture<EditAccountFormComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EditAccountFormComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EditAccountFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
