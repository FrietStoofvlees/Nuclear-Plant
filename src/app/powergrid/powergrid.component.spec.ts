import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PowergridComponent } from './powergrid.component';

describe('PowergridComponent', () => {
  let component: PowergridComponent;
  let fixture: ComponentFixture<PowergridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PowergridComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PowergridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
