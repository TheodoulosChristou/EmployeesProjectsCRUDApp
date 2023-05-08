import { Component, OnInit } from '@angular/core';
import { Employee } from '../employees/employee.model';
import { EmployeeSerivce } from '../employees/employee.service';

@Component({
  selector: 'app-employees-pick-list',
  templateUrl: './employees-pick-list.component.html',
  styleUrls: ['./employees-pick-list.component.css']
})
export class EmployeesPickListComponent implements OnInit{

  //available employees to select
  sourceEmployees:Employee[] = [];
  
  //selected employees 
  targetEmployees:Employee[] = [];

  //Constructs an employeeService from EmployeeService Class
  constructor(private employeeService:EmployeeSerivce){

  }

  /*
    Function which fetch all the employees from the Backend.
  */
  ngOnInit(): void {
    this.employeeService.getAllEmployees().subscribe(
      (data:Employee[]) => {
        this.sourceEmployees = data;
      }
    )
    this.targetEmployees = [];
  }
}
