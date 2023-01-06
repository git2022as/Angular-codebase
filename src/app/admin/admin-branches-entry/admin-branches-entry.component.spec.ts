import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBranchesEntryComponent } from './admin-branches-entry.component';

describe('AdminBranchesEntryComponent', () => {
  let component: AdminBranchesEntryComponent;
  let fixture: ComponentFixture<AdminBranchesEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminBranchesEntryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminBranchesEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
