import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MachdComponent } from './machd.component';

describe('MachdComponent', () => {
  let component: MachdComponent;
  let fixture: ComponentFixture<MachdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MachdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MachdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
