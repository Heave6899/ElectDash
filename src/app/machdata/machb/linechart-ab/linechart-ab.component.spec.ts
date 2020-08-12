import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinechartABComponent } from './linechart-ab.component';

describe('LinechartABComponent', () => {
  let component: LinechartABComponent;
  let fixture: ComponentFixture<LinechartABComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinechartABComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinechartABComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
