import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {EditMessageFormComponent} from "./edit-message-form.component";

describe('EditMessageFormComponent', () => {
    let component: EditMessageFormComponent;
    let fixture: ComponentFixture<EditMessageFormComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EditMessageFormComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EditMessageFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
