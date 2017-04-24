import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideDeckComponent } from './slide-deck.component';

describe('SlideDeckComponent', () => {
  let component: SlideDeckComponent;
  let fixture: ComponentFixture<SlideDeckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlideDeckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideDeckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
