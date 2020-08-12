import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinechartAFComponent } from './linechart-af.component';

describe('LinechartAFComponent', () => {
  let component: LinechartAFComponent;
  let fixture: ComponentFixture<LinechartAFComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinechartAFComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinechartAFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
