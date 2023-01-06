import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSlidesEntryComponent } from './admin-slides-entry.component';

describe('AdminSlidesEntryComponent', () => {
  let component: AdminSlidesEntryComponent;
  let fixture: ComponentFixture<AdminSlidesEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSlidesEntryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminSlidesEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
