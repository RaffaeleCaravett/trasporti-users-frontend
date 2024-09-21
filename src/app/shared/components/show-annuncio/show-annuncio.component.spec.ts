import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAnnuncioComponent } from './show-annuncio.component';

describe('ShowAnnuncioComponent', () => {
  let component: ShowAnnuncioComponent;
  let fixture: ComponentFixture<ShowAnnuncioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowAnnuncioComponent]
    });
    fixture = TestBed.createComponent(ShowAnnuncioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
