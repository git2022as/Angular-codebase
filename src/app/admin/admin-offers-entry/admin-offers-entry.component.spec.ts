import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOffersEntryComponent } from './admin-offers-entry.component';

describe('AdminOffersEntryComponent', () => {
  let component: AdminOffersEntryComponent;
  let fixture: ComponentFixture<AdminOffersEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminOffersEntryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminOffersEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
