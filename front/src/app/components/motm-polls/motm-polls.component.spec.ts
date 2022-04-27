/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {MotmPollsComponent} from "./motm-polls.component";

describe('MotmPollsComponent', () => {
    let component: MotmPollsComponent;
    let fixture: ComponentFixture<MotmPollsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MotmPollsComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MotmPollsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
