import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsSliceComponent } from './products-slice.component';

describe('ProductsSliceComponent', () => {
  let component: ProductsSliceComponent;
  let fixture: ComponentFixture<ProductsSliceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsSliceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsSliceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
