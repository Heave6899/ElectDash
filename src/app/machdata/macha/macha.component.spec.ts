import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MachaComponent } from './macha.component';

describe('MachaComponent', () => {
  let component: MachaComponent;
  let fixture: ComponentFixture<MachaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MachaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MachaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
