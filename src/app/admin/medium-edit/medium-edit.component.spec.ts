import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediumEditComponent } from './medium-edit.component';

describe('MediumEditComponent', () => {
  let component: MediumEditComponent;
  let fixture: ComponentFixture<MediumEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediumEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediumEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
