import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {EditMatchFormComponent} from "./edit-match-form.component";

describe('EditMatchFormComponent', () => {
    let component: EditMatchFormComponent;
    let fixture: ComponentFixture<EditMatchFormComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EditMatchFormComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EditMatchFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
