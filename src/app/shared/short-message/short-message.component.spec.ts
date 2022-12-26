import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortMessageComponent } from './short-message.component';

describe('ShortMessageComponent', () => {
  let component: ShortMessageComponent;
  let fixture: ComponentFixture<ShortMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShortMessageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShortMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
