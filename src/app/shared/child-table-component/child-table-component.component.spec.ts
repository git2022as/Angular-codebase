import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildTableComponentComponent } from './child-table-component.component';

describe('ChildTableComponentComponent', () => {
  let component: ChildTableComponentComponent;
  let fixture: ComponentFixture<ChildTableComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChildTableComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChildTableComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
