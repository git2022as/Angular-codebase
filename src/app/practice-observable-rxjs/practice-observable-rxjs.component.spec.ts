import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticeObservableRxjsComponent } from './practice-observable-rxjs.component';

describe('PracticeObservableRxjsComponent', () => {
  let component: PracticeObservableRxjsComponent;
  let fixture: ComponentFixture<PracticeObservableRxjsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PracticeObservableRxjsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PracticeObservableRxjsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
