import { Injectable } from "@angular/core";
import { Employee } from "./employee.model";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()

/*
    Employee Service Class is a class
    which calls the Backend URL in order
    to complete all the CRUD operations 
    for the Employees.
*/
export class EmployeeSerivce {

    //constructs HttpClient Service in order to call
    //the backend
    constructor(private http:HttpClient){
        
    }

    /*
        Function which gets all the employees
        from the backend.
    */
    getAllEmployees():Observable<Employee[]>{
        return this.http.get<Employee[]>('https://localhost:7183/api/Employee');
    }

    /*
        Function which adds an employee
        from the backend.
    */
    addEmployee(employee:any):Observable<Employee[]>{
        return this.http.post<Employee[]>('https://localhost:7183/api/Employee', employee);
    }

    /*
        Function which deletes an employee
        from the backend.
    */
    deleteEmployee(id:number):Observable<Employee[]> {
        return this.http.delete<Employee[]>('https://localhost:7183/api/Employee/' + id);
    }

    /*
        Function which get a single employee
        from the backend.
    */
    getEmployee(id:number):Observable<Employee> {
        return this.http.get<Employee>('https://localhost:7183/api/Employee/' + id);
    }

    /*
        Function which updates an employee
        from the backend.
    */
    updateEmployee(employee:Employee):Observable<Employee[]>{
        return this.http.put<Employee[]>('https://localhost:7183/api/Employee',employee);
    }
}