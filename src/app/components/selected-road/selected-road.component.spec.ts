import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedRoadComponent } from './selected-road.component';

describe('SelectedRoadComponent', () => {
  let component: SelectedRoadComponent;
  let fixture: ComponentFixture<SelectedRoadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectedRoadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedRoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
