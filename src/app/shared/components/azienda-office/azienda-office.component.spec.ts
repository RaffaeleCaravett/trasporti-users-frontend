import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AziendaOfficeComponent } from './azienda-office.component';

describe('AziendaOfficeComponent', () => {
  let component: AziendaOfficeComponent;
  let fixture: ComponentFixture<AziendaOfficeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AziendaOfficeComponent]
    });
    fixture = TestBed.createComponent(AziendaOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
