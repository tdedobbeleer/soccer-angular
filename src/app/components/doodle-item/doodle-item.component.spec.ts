import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DoodleItemComponent} from './doodle-item.component';

describe('DoodleItemComponent', () => {
    let component: DoodleItemComponent;
    let fixture: ComponentFixture<DoodleItemComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DoodleItemComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DoodleItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
