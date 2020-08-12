import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinechartAAComponent } from './linechart-aa.component';

describe('LinechartAAComponent', () => {
  let component: LinechartAAComponent;
  let fixture: ComponentFixture<LinechartAAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinechartAAComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinechartAAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
