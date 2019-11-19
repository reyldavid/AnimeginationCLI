import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReydavidComponent } from './reydavid.component';

describe('ReydavidComponent', () => {
  let component: ReydavidComponent;
  let fixture: ComponentFixture<ReydavidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReydavidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReydavidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
