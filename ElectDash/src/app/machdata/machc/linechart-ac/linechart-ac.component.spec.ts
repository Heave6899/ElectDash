import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinechartACComponent } from './linechart-ac.component';

describe('LinechartACComponent', () => {
  let component: LinechartACComponent;
  let fixture: ComponentFixture<LinechartACComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinechartACComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinechartACComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
