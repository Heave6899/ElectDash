import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinechartAEComponent } from './linechart-ae.component';

describe('LinechartAEComponent', () => {
  let component: LinechartAEComponent;
  let fixture: ComponentFixture<LinechartAEComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinechartAEComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinechartAEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
