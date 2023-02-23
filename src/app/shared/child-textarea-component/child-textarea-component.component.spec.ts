import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildTextareaComponentComponent } from './child-textarea-component.component';

describe('ChildTextareaComponentComponent', () => {
  let component: ChildTextareaComponentComponent;
  let fixture: ComponentFixture<ChildTextareaComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChildTextareaComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChildTextareaComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
