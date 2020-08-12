import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinechartVEComponent } from './linechart-ve.component';

describe('LinechartVEComponent', () => {
  let component: LinechartVEComponent;
  let fixture: ComponentFixture<LinechartVEComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinechartVEComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinechartVEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
