import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendEditComponent } from './recommend-edit.component';

describe('RecommendEditComponent', () => {
  let component: RecommendEditComponent;
  let fixture: ComponentFixture<RecommendEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecommendEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
