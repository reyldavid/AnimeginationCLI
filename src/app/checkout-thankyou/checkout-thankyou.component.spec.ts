import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutThankyouComponent } from './checkout-thankyou.component';

describe('CheckoutThankyouComponent', () => {
  let component: CheckoutThankyouComponent;
  let fixture: ComponentFixture<CheckoutThankyouComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckoutThankyouComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutThankyouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
