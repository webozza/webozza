import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionFrequencyComponent } from './transaction-frequency.component';

describe('TransactionFrequencyComponent', () => {
  let component: TransactionFrequencyComponent;
  let fixture: ComponentFixture<TransactionFrequencyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionFrequencyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionFrequencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
