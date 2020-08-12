import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinechartVAComponent } from './linechart-va.component';

describe('LinechartVAComponent', () => {
  let component: LinechartVAComponent;
  let fixture: ComponentFixture<LinechartVAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinechartVAComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinechartVAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
