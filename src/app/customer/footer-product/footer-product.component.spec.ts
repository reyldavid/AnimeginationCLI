import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterProductComponent } from './footer-product.component';

describe('FooterProductComponent', () => {
  let component: FooterProductComponent;
  let fixture: ComponentFixture<FooterProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
