import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {NextMatchComponent} from "./next-match.component";

describe('NextMatchComponent', () => {
    let component: NextMatchComponent;
    let fixture: ComponentFixture<NextMatchComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NextMatchComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NextMatchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
