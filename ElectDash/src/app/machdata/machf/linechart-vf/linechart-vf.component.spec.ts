import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinechartVFComponent } from './linechart-vf.component';

describe('LinechartVFComponent', () => {
  let component: LinechartVFComponent;
  let fixture: ComponentFixture<LinechartVFComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinechartVFComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinechartVFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
