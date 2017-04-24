import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservableComponent } from './observable.component';

describe('Observable', () => {
  let component: ObservableComponent;
  let fixture: ComponentFixture<ObservableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObservableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
