import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSpedizioneComponent } from './show-spedizione.component';

describe('ShowSpedizioneComponent', () => {
  let component: ShowSpedizioneComponent;
  let fixture: ComponentFixture<ShowSpedizioneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowSpedizioneComponent]
    });
    fixture = TestBed.createComponent(ShowSpedizioneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
