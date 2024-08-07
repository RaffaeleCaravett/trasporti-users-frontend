import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnuncioInfoComponent } from './annuncio-info.component';

describe('AnnuncioInfoComponent', () => {
  let component: AnnuncioInfoComponent;
  let fixture: ComponentFixture<AnnuncioInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnnuncioInfoComponent]
    });
    fixture = TestBed.createComponent(AnnuncioInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
