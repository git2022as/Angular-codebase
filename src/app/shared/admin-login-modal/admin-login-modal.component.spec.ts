import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLoginModalComponent } from './admin-login-modal.component';

describe('AdminLoginModalComponent', () => {
  let component: AdminLoginModalComponent;
  let fixture: ComponentFixture<AdminLoginModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminLoginModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminLoginModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
