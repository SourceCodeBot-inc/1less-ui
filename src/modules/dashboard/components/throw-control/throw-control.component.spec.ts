import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThrowControlComponent } from './throw-control.component';

describe('ThrowControlComponent', () => {
  let component: ThrowControlComponent;
  let fixture: ComponentFixture<ThrowControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThrowControlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThrowControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
