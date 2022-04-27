/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {MotmPollComponent} from "./motm-poll.component";

describe('MotmPollComponent', () => {
    let component: MotmPollComponent;
    let fixture: ComponentFixture<MotmPollComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MotmPollComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MotmPollComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
