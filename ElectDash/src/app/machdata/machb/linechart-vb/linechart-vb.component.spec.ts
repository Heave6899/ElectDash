import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinechartVBComponent } from './linechart-vb.component';

describe('LinechartVBComponent', () => {
  let component: LinechartVBComponent;
  let fixture: ComponentFixture<LinechartVBComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinechartVBComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinechartVBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
