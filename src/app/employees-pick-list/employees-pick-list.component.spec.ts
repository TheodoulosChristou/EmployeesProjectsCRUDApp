import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesPickListComponent } from './employees-pick-list.component';

describe('EmployeesPickListComponent', () => {
  let component: EmployeesPickListComponent;
  let fixture: ComponentFixture<EmployeesPickListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeesPickListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeesPickListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
