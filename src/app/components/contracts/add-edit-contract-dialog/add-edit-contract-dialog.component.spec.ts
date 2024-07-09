import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditContractDialogComponent } from './add-edit-contract-dialog.component';

describe('AddEditContractDialogComponent', () => {
  let component: AddEditContractDialogComponent;
  let fixture: ComponentFixture<AddEditContractDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddEditContractDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddEditContractDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
