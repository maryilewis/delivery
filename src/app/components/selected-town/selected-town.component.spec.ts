import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedTownComponent } from './selected-town.component';

describe('SelectedTownComponent', () => {
  let component: SelectedTownComponent;
  let fixture: ComponentFixture<SelectedTownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectedTownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedTownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
