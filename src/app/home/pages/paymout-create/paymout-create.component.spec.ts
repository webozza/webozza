import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymoutCreateComponent } from './paymout-create.component';

describe('PaymoutCreateComponent', () => {
  let component: PaymoutCreateComponent;
  let fixture: ComponentFixture<PaymoutCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymoutCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymoutCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
