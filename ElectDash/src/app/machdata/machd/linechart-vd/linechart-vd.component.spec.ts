import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinechartVDComponent } from './linechart-vd.component';

describe('LinechartVDComponent', () => {
  let component: LinechartVDComponent;
  let fixture: ComponentFixture<LinechartVDComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinechartVDComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinechartVDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
