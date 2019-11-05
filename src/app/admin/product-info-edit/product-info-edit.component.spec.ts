import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductInfoEditComponent } from './product-info-edit.component';

describe('ProductInfoEditComponent', () => {
  let component: ProductInfoEditComponent;
  let fixture: ComponentFixture<ProductInfoEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductInfoEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductInfoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
