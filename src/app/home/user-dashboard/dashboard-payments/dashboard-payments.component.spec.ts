import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPaymentsComponent } from './dashboard-payments.component';

describe('DashboardPaymentsComponent', () => {
  let component: DashboardPaymentsComponent;
  let fixture: ComponentFixture<DashboardPaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardPaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
