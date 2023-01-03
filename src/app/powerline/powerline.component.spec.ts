import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PowerlineComponent } from './powerline.component';

describe('PowerlineComponent', () => {
  let component: PowerlineComponent;
  let fixture: ComponentFixture<PowerlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PowerlineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PowerlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
