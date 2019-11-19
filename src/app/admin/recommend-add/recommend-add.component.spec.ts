import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendAddComponent } from './recommend-add.component';

describe('RecommendAddComponent', () => {
  let component: RecommendAddComponent;
  let fixture: ComponentFixture<RecommendAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecommendAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
