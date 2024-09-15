import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrasportatoreOfficeComponent } from './trasportatore-office.component';

describe('TrasportatoreOfficeComponent', () => {
  let component: TrasportatoreOfficeComponent;
  let fixture: ComponentFixture<TrasportatoreOfficeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrasportatoreOfficeComponent]
    });
    fixture = TestBed.createComponent(TrasportatoreOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
