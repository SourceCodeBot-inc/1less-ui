import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartBinComponent } from './smart-bin.component';

describe('SmartBinComponent', () => {
  let component: SmartBinComponent;
  let fixture: ComponentFixture<SmartBinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmartBinComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmartBinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
