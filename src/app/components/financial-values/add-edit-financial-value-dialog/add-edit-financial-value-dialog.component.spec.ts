import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditFinancialValueDialogComponent } from './add-edit-financial-value-dialog.component';

describe('AddEditFinancialValueDialogComponent', () => {
  let component: AddEditFinancialValueDialogComponent;
  let fixture: ComponentFixture<AddEditFinancialValueDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddEditFinancialValueDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddEditFinancialValueDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
