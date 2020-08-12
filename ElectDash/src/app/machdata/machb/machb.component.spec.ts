import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MachbComponent } from './machb.component';

describe('MachbComponent', () => {
  let component: MachbComponent;
  let fixture: ComponentFixture<MachbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MachbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MachbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
