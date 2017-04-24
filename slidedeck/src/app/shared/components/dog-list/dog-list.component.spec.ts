import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DogListComponent } from './dog-list.component';

describe('DogListComponent', () => {
  let component: DogListComponent;
  let fixture: ComponentFixture<DogListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DogListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DogListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
