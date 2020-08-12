import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MachcComponent } from './machc.component';

describe('MachcComponent', () => {
  let component: MachcComponent;
  let fixture: ComponentFixture<MachcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MachcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MachcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
