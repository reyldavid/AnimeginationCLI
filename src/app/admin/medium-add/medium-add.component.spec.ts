import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediumAddComponent } from './medium-add.component';

describe('MediumAddComponent', () => {
  let component: MediumAddComponent;
  let fixture: ComponentFixture<MediumAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediumAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediumAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
