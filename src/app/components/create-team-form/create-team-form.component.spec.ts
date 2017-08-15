import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {CreateTeamFormComponent} from "./create-team-form.component";

describe('CreateTeamFormComponent', () => {
    let component: CreateTeamFormComponent;
    let fixture: ComponentFixture<CreateTeamFormComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CreateTeamFormComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CreateTeamFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
