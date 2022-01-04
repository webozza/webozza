import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayoutsPaymentComponent } from './payouts-payment.component';

describe('PayoutsPaymentComponent', () => {
  let component: PayoutsPaymentComponent;
  let fixture: ComponentFixture<PayoutsPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayoutsPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayoutsPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
