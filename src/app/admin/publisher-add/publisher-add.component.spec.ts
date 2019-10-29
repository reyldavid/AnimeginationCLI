import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublisherAddComponent } from './publisher-add.component';

describe('PublisherAddComponent', () => {
  let component: PublisherAddComponent;
  let fixture: ComponentFixture<PublisherAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublisherAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublisherAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
