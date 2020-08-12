import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinechartVCComponent } from './linechart-vc.component';

describe('LinechartVCComponent', () => {
  let component: LinechartVCComponent;
  let fixture: ComponentFixture<LinechartVCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinechartVCComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinechartVCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
