import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildDropdownComponentComponent } from './child-dropdown-component.component';

describe('ChildDropdownComponentComponent', () => {
  let component: ChildDropdownComponentComponent;
  let fixture: ComponentFixture<ChildDropdownComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChildDropdownComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChildDropdownComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
