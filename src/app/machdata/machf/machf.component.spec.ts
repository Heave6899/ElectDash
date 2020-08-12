import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MachfComponent } from './machf.component';

describe('MachfComponent', () => {
  let component: MachfComponent;
  let fixture: ComponentFixture<MachfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MachfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MachfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
