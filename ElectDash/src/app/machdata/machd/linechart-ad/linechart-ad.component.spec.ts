import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinechartADComponent } from './linechart-ad.component';

describe('LinechartADComponent', () => {
  let component: LinechartADComponent;
  let fixture: ComponentFixture<LinechartADComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinechartADComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinechartADComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
