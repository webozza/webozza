import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnableTestmodeComponent } from './enable-testmode.component';

describe('EnableTestmodeComponent', () => {
  let component: EnableTestmodeComponent;
  let fixture: ComponentFixture<EnableTestmodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnableTestmodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnableTestmodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
