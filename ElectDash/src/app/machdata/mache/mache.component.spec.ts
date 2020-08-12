import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MacheComponent } from './mache.component';

describe('MacheComponent', () => {
  let component: MacheComponent;
  let fixture: ComponentFixture<MacheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MacheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MacheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
