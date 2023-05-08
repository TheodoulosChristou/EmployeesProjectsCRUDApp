import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Project } from "./project.model";

@Injectable()

/*
    Project Service Class is a class
    which calls the Backend URL in order
    to complete all the CRUD operations 
    for the Projects.
*/
export class ProjectService {

     //constructs HttpClient Service in order to call
    //the backend
    constructor(private http:HttpClient){

    }

    /*
        Function which gets all the projects
        from the backend.
    */
    getAllProjects():Observable<Project[]> {
        return this.http.get<Project[]>('https://localhost:7183/api/Project');
    }

    /*
        Function which adds a project
        from the backend.
    */
    addProject(project:any):Observable<Project[]>{
        return this.http.post<Project[]>('https://localhost:7183/api/Project',project);
    }

    /*
        Function which deletes a project
        from the backend.
    */
    deleteProject(id:number):Observable<Project[]>{
        return this.http.delete<Project[]>('https://localhost:7183/api/Project/'+id);
    }

    /*
        Function which updates a project
        from the backend.
    */
    updateProject(project:any):Observable<Project[]> {
        return this.http.put<Project[]>('https://localhost:7183/api/Project',project);
    }
}