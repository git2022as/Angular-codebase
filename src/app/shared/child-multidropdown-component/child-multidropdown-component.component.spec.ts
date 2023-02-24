import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildMultidropdownComponentComponent } from './child-multidropdown-component.component';

describe('ChildMultidropdownComponentComponent', () => {
  let component: ChildMultidropdownComponentComponent;
  let fixture: ComponentFixture<ChildMultidropdownComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChildMultidropdownComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChildMultidropdownComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
