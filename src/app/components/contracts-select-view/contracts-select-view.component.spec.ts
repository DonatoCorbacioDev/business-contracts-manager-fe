import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractsSelectViewComponent } from './contracts-select-view.component';

describe('ContractsSelectViewComponent', () => {
  let component: ContractsSelectViewComponent;
  let fixture: ComponentFixture<ContractsSelectViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContractsSelectViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContractsSelectViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
