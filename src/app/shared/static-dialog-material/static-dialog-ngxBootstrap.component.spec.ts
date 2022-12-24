import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticDialogMaterialComponent } from './static-dialog-material.component';

describe('StaticDialogMaterialComponent', () => {
  let component: StaticDialogMaterialComponent;
  let fixture: ComponentFixture<StaticDialogMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaticDialogMaterialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaticDialogMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
