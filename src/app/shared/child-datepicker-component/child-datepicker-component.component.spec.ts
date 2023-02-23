import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildDatepickerComponentComponent } from './child-datepicker-component.component';

describe('ChildDatepickerComponentComponent', () => {
  let component: ChildDatepickerComponentComponent;
  let fixture: ComponentFixture<ChildDatepickerComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChildDatepickerComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChildDatepickerComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
