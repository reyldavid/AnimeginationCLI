import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductInfoAddComponent } from './product-info-add.component';

describe('ProductInfoAddComponent', () => {
  let component: ProductInfoAddComponent;
  let fixture: ComponentFixture<ProductInfoAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductInfoAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductInfoAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
