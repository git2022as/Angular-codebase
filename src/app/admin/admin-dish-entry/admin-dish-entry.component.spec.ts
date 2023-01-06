import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDishEntryComponent } from './admin-dish-entry.component';

describe('AdminDishEntryComponent', () => {
  let component: AdminDishEntryComponent;
  let fixture: ComponentFixture<AdminDishEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDishEntryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDishEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
