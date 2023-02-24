import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildErrorComponentComponent } from './child-error-component.component';

describe('ChildErrorComponentComponent', () => {
  let component: ChildErrorComponentComponent;
  let fixture: ComponentFixture<ChildErrorComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChildErrorComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChildErrorComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
