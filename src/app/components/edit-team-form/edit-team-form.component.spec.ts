import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {EditTeamFormComponent} from "./edit-team-form.component";

describe('EditTeamFormComponent', () => {
    let component: EditTeamFormComponent;
    let fixture: ComponentFixture<EditTeamFormComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EditTeamFormComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EditTeamFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
