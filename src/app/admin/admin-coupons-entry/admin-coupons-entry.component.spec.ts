import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCouponsEntryComponent } from './admin-coupons-entry.component';

describe('AdminCouponsEntryComponent', () => {
  let component: AdminCouponsEntryComponent;
  let fixture: ComponentFixture<AdminCouponsEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCouponsEntryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCouponsEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
