/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {FailWhaleComponent} from "./fail-whale.component";

describe('FailWhaleComponent', () => {
    let component: FailWhaleComponent;
    let fixture: ComponentFixture<FailWhaleComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FailWhaleComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FailWhaleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
