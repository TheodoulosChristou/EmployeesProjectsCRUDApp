import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/projects/project.model';
import { ProjectService } from 'src/app/projects/project.service';

@Component({
  selector: 'app-projects-table',
  templateUrl: './projects-table.component.html',
  styleUrls: ['./projects-table.component.css']
})
export class ProjectsTableComponent implements OnInit {
  projects:Project[] = [];

  /*
    Constructs a ProjectService from ProjectService Class
  */
  constructor(private projectService:ProjectService){

  }

  /*
    Function which fetch all the projects from the backend.
  */
  ngOnInit(): void {
    this.projectService.getAllProjects().subscribe(
      (data:Project[])=> {
        this.projects = data;
      }
    )
  }
} 
