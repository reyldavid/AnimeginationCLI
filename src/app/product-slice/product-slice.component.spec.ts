import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSliceComponent } from './product-slice.component';

describe('ProductSliceComponent', () => {
  let component: ProductSliceComponent;
  let fixture: ComponentFixture<ProductSliceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductSliceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSliceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
