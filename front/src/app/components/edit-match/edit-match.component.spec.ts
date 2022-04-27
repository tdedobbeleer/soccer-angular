import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {EditMatchComponent} from "./edit-match.component";

describe('EditMatchComponent', () => {
    let component: EditMatchComponent;
    let fixture: ComponentFixture<EditMatchComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EditMatchComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EditMatchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
