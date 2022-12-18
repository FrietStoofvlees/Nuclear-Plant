import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactorComponent } from './reactor.component';

describe('ReactorComponent', () => {
  let component: ReactorComponent;
  let fixture: ComponentFixture<ReactorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReactorComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ReactorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
