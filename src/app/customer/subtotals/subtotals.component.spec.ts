import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubtotalsComponent } from './subtotals.component';

describe('SubtotalsComponent', () => {
  let component: SubtotalsComponent;
  let fixture: ComponentFixture<SubtotalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubtotalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubtotalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
