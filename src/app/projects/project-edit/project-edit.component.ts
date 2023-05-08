import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProjectService } from '../project.service';
import { Project } from '../project.model';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit, OnChanges{

  @Output() projects = new EventEmitter<Project[]>;

  // event Emitter of closing the project form dialog
  @Output() clickClose = new EventEmitter<any>;

  //gets a value from the ProjectsListComponent if a project is selected.
  @Input() selectedProject:Project | any;

  // event emitter if a project is added.
  @Output() addProjectBoolean = new EventEmitter<boolean>;

  // event emitter if a project is updated.
  @Output() editProjectBoolean = new EventEmitter<boolean>;

  // event emitter if CRUD operations failed.
  @Output() errorMessageBoolean = new EventEmitter<boolean>;


   /*
    constructs a formBuilder(Reactive Form), 
    a project service of ProjectService class
    and a router from Router Class.
  */
  constructor(private fb:FormBuilder, private projectService:ProjectService) {

  }

  /*
    A reactive form using FormBuilder
    and named it as projectForm. In projectForm
    initialize field names which are:
    - projectName Field
    - clientName Field
    - duration Field
    - initiationDate Field
    and add Validations.
  */
  projectForm = this.fb.group({
    projectName:["", Validators.required],
    clientName:["",Validators.required],
    duration:["",Validators.required],
    initiationDate:[Date, Validators.required]
  })

    /*
      Function which closes the 
      project form dialog. Also,
      resets the projectForm
      and put the selectedProject value as null. 
    */
  closeModal() {
    this.projectForm.reset();
    this.clickClose.emit(true);
    this.selectedProject = null;
  }

  /*
    Function whichs checks if a project is selected.
    If it is selected then calls the project service from 
    the Project Service class and update the project. If it is
    not selected then calls the project service to add a project.
    If something is wrong in both services it handles the errors. 
  */
    addUpdateProject() {
    if(this.selectedProject === null) {
      this.projectService.addProject(this.projectForm.value).subscribe(
        (data:Project[]) => {
          this.projects.emit(data);
          this.addProjectBoolean.emit(true);
          this.closeModal();
        }, error => {
          catchError(error);
          console.log(error);
          this.errorMessageBoolean.emit(true);
          this.closeModal();
        }
      );
    } else {
      let project:Project = {
        id: this.selectedProject.id,
        projectName:this.projectForm.value.projectName,
        clientName: this.projectForm.value.clientName,
        duration: this.projectForm.value.duration,
        initiationDate: this.projectForm.value.initiationDate
      } 
      this.projectService.updateProject(project).subscribe(
        (data:Project[]) => {
          this.projects.emit(data);
          this.editProjectBoolean.emit(true);
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
      Checks if the project is selected.
      If the project is selected then it sets
      all the values that it has to the project form dialog
      for editing purposes. If the project is not selected
      then the form is reset.
    */  
  ngOnChanges(): void {
    if(this.selectedProject){
      this.selectedProject.initiationDate = new Date(this.selectedProject.initiationDate);
      this.projectForm.patchValue(this.selectedProject);
    } else {
      this.projectForm.reset();
    }
  }
}
