import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee.model';
import { EmployeeSerivce } from '../employee.service';
import { Message } from 'primeng/api';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class EmployeeListComponent implements OnInit{

  
  employees:Employee[] = [];

  visible:boolean = false;

  // array of messages for delete Employee
  deleteEmployeeMessage:Message[] = [];
  
  // array of messages for add Employee
  addEmployeeMessage:Message[] = [];

  // array of messages for edit Employee
  editEmployeeMessage:Message[] = [];

  // array of messages for display error messages
  errorEmployeeMessage:Message[] = [];

 
  selectedEmployee:any = null;

  addEmployeeBoolean:boolean = false;

  editEmployeeBoolean:boolean = false;

  deleteMessage:boolean =false;

  errorMessageBoolean:boolean = false;

  //construct an employee service, confirmation service and message Service
  constructor(private employeeService:EmployeeSerivce, private confirmationService:ConfirmationService, private messageService:MessageService){

  }

  ngOnInit(): void {

    //fetch all the employees.
    this.fetchEmployees();

    //initialises the deleteMessage to false.
    this.deleteMessage = false;

    //initialises the selectedEmployee to null.
    this.selectedEmployee = null;
  }

  /*
    Function which calls a service and gets
    all the employees from the Database.
  */
  fetchEmployees(){
    this.employeeService.getAllEmployees().subscribe(
      (employees:Employee[]) =>{
        this.employees = employees;
      }
    )
  }

  /*
    Function which calls a service from the EmployeeService class
    and delete an employee which a user choose. After deletion of 
    an employee displays a toast message and fetch all the employees.
  */
  deleteEmployee(id:number) {
    this.confirmationService.confirm({
        message: 'Do you want to delete this record?',
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        accept: () => {
            this.employeeService.deleteEmployee(id).subscribe(
              (response:Employee[]) => {
                this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted with employee ID: '+ id });
                this.confirmationService.close();
                setTimeout(() => {
                  window.location.reload();
                }, 1000);
              }
            )
        },
        reject: (type:any) => {
            switch (type) {
                case ConfirmEventType.REJECT:
                    this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected to delete this employee' });
                    break;
                case ConfirmEventType.CANCEL:
                    this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled the DELETE process' });
                    
                    break;
            }
            this.confirmationService.close();
        }
    });
  }
  
  /*
    Function which shows 
    the employee dialog form 
    for adding an employee.
  */
  showDialog() {
    this.visible = true;
    this.selectedEmployee = null;
  }


  /*
    Function which closes
    the employee dialog form.
  */
  hideModal(isClosed:boolean) {
    this.visible = !isClosed;
  }


  /*
    Function which shows
    the employee dialog form 
    for editing an employee.
  */
  showEditModal(employee: Employee){
    this.visible = true;
    this.selectedEmployee = employee;
  }

  /*
    Function which displays a confirmation message
    if the employee added successfully.
  */
  messageForAddEmployee(addEmployee:boolean) {
    this.addEmployeeBoolean = addEmployee;
    this.addEmployeeMessage = [
      { severity: 'success', summary: 'Success', detail: 'Employee Successfully Added.' }
    ]
  }


  /*
    Function which displays a confirmation message
    if the employee updated successfully.
  */
  messageForEditMessage(editEmployee:boolean) {
    this.editEmployeeBoolean = editEmployee;
    this.editEmployeeMessage = [
      { severity: 'success', summary: 'Success', detail: 'Employee Successfully Updated.' }
    ]
  }


  /*
    Function which displays error messages
    if user failed to add/update/delete an employee.
  */
  errorMessage(errMessage:boolean) {
    this.errorMessageBoolean = errMessage;
    this.errorEmployeeMessage = [
      { severity: 'error', summary: 'Error', detail: 'Error!! Could not Add/Update/Delete employee' },
    ]
  }
}
