import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Employee } from '../employee.model';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { EmployeeSerivce } from '../employee.service';
import { Router } from '@angular/router';
import { Message } from 'primeng/api';
import { catchError } from 'rxjs';
import { AbstractControl, ValidatorFn } from '@angular/forms';


@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit, OnChanges{

  @Output() employeeList = new EventEmitter<Employee[]>();

  // event Emitter of closing the employee form dialog
  @Output() clickClose = new EventEmitter<any>();

  //gets a value from the EmployeeListComponent if an employee is selected.
  @Input() selectedEmployee:Employee| any;

  // event emitter if an employee is added.
  @Output() addEmployeeBoolean = new EventEmitter<boolean>;

  // event emitter if an employee is updated.
  @Output() editEmployeeBoolean = new EventEmitter<boolean>;

  // event emitter if CRUD operations failed.
  @Output() errorMessageBoolean = new EventEmitter<boolean>;

  /*
    constructs a formBuilder(Reactive Form), 
    an employee service of EmployeeService class
    and a router from Router Class.
  */
  constructor(private fb:FormBuilder, private employeeService:EmployeeSerivce,  private router: Router){

  }

  /*
    A reactive form using FormBuilder
    and named it as employeeForm. In employeeForm
    initialize field names which are:
    - Name Field
    - Surname Field
    - Date of Birth Field
    - Phone Number Field
    - Position Field
    and add Validations.
  */
  employeeForm = this.fb.group({
    name:["", Validators.required],
    surname:["", Validators.required],
    dateOfBirth:[Date, Validators.required],
    phoneNumber:["", [Validators.required, this.containsNumberValidator()]],
    position:["", Validators.required]
  })

  /*
    Function which closes the 
    employee form dialog. Also,
    resets the employeeForm
    and put the selectedEmployee value as null. 
  */
  closeModal(){
    this.employeeForm.reset();
    this.clickClose.emit(true);
    this.selectedEmployee = null;
  }


  /*
    Function whichs checks if an employee is selected.
    If it is selected then calls the employee service from 
    the Employee Service class and update the employee. If it is
    not selected then calls the employee service to add an employee.
    If something is wrong in both services it handles the errors. 
  */
  addUpdateEmployee() {
    if(this.selectedEmployee === null){
      this.employeeService.addEmployee(this.employeeForm.value).subscribe(
        (response:Employee[]) =>{
          this.employeeList.emit(response);
          this.addEmployeeBoolean.emit(true);
          this.closeModal();
        }, error => {
          catchError(error);
          console.log(error);
          this.errorMessageBoolean.emit(true);
          this.closeModal();
        }
      );
    } else {
      let employee : Employee = {
        id:this.selectedEmployee.id,
        name:this.employeeForm.value.name,
        surname: this.employeeForm.value.surname,
        dateOfBirth: this.employeeForm.value.dateOfBirth,
        phoneNumber: this.employeeForm.value.phoneNumber,
        position:this.employeeForm.value.position
      }
      
      this.employeeService.updateEmployee(employee).subscribe(
        (response:Employee[]) =>{
          this.employeeList.emit(response);
          this.editEmployeeBoolean.emit(true);
          this.closeModal();
        }, error => {
          catchError(error);
          console.log(error);
          this.errorMessageBoolean.emit(true);
          this.closeModal();
        }
      )
    }
  }

  ngOnInit(): void {
  }

  /*
    Checks if the employee is selected.
    If the employee is selected then it sets
    all the values that it has to the employee form dialog
    for editing purposes. If the employee is not selected
    then the form is reset.
  */
  ngOnChanges(): void {  
    if(this.selectedEmployee){
      this.selectedEmployee.dateOfBirth = new Date(this.selectedEmployee.dateOfBirth);
      this.employeeForm.patchValue(this.selectedEmployee);
    } else {
      this.employeeForm.reset();
    }
  }

/*
  Function which checks if the phoneNumber field in the employee
  form dialog contains only numbers and not characters. If the phoneNumber
  field contains characters then it informs the user that the phoneNumber field
  must contains only numbers.
*/
containsNumberValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const containsNumber = /^\d+$/.test(control.value);
      return containsNumber ? null : { containsNumber: true };
    };
  }

}
