import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSlideComponent } from './product-slide.component';

describe('ProductSlideComponent', () => {
  let component: ProductSlideComponent;
  let fixture: ComponentFixture<ProductSlideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductSlideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
