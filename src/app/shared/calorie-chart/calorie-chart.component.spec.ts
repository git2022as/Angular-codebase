import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalorieChartComponent } from './calorie-chart.component';

describe('CalorieChartComponent', () => {
  let component: CalorieChartComponent;
  let fixture: ComponentFixture<CalorieChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalorieChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalorieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
