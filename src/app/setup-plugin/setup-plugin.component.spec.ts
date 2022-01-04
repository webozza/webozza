import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupPluginComponent } from './setup-plugin.component';

describe('SetupPluginComponent', () => {
  let component: SetupPluginComponent;
  let fixture: ComponentFixture<SetupPluginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetupPluginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupPluginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
