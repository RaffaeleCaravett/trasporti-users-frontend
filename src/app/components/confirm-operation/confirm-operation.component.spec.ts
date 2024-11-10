import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmOperationComponent } from './confirm-operation.component';

describe('ConfirmOperationComponent', () => {
  let component: ConfirmOperationComponent;
  let fixture: ComponentFixture<ConfirmOperationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmOperationComponent]
    });
    fixture = TestBed.createComponent(ConfirmOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
