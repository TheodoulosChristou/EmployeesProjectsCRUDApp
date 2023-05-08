import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';
import { Project } from '../project.model';
import { TreeNode } from 'primeng/api';
import { Message } from 'primeng/api';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class ProjectListComponent implements OnInit {


  projects:Project[] = [];

  
  visibleDialog:boolean = false;

  
  addProjectBoolean:boolean = false;

  editProjectBoolean:boolean = false;

  deleteProjectBoolean:boolean = false;

  errorMessageBoolean:boolean = false;

  
  selectedProject: any = null;

  // array of messages for add Project
  messagesForAddProject: Message[] = [];

  // array of messages for update Project
  messagesForEditProject: Message[] = [];

  // array of messages for delete Project
  messagesForDeleteProject: Message[] = [];

  // array of messages for display error messages
  errorMessages: Message[] = [];

  //construct a project service using ProjectService Class
  constructor(private projectService:ProjectService, private confirmationService:ConfirmationService, private messageService:MessageService){

  }


  ngOnInit(): void {
    //fetch all the projects.
    this.fetchProjects();
  }

  /*
    Function which calls a service and gets
    all the projects from the Database.
  */
  fetchProjects() {
    this.projectService.getAllProjects().subscribe(
      (data) => {
        this.projects = data;
        console.log(this.projects);
      }
    )
  }

   /*
    Function which shows 
    the project dialog form 
    for adding a project.
  */
  showDialog() {
    this.visibleDialog = !this.visibleDialog;
    this.selectedProject = null;
  }

  /*
    Function which closes
    the project dialog form.
  */
  hideModal(isClosed:boolean) {
    this.visibleDialog = !isClosed;
  }

  /*
    Function which calls a service from the ProjectService class
    and delete a project which a user choose. After deletion of 
    an employee displays a toast message and fetch all the projects.
  */
  deleteProject(id:number) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
          this.projectService.deleteProject(id).subscribe(
            (response:Project[]) => {
              this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted with project ID: ' + id });
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
                  this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected to delete this project' });
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
    the project dialog form 
    for editing a project.
  */
  showEditProject(project:Project){
    this.visibleDialog = true;
    this.selectedProject = project;
  }

  /*
    Function which displays a confirmation message
    if the project added successfully.
  */
  messageForAddProject(addedProject:boolean) {
    this.addProjectBoolean = addedProject;
    this.messagesForAddProject = [{
      severity: 'success', summary: 'Success', detail: 'Project Added Successfully.',
    }]
  }

  /*
    Function which displays a confirmation message
    if the project updated successfully.
  */
  messageForEditProject(editedProject:boolean){
    this.editProjectBoolean = editedProject;
    this.messagesForEditProject = [
      { severity: 'success', summary: 'Success', detail: 'Project Updated Successfully.' }
    ]
  }

   /*
    Function which displays error messages
    if user failed to add/update/delete a project.
  */
  errorMessage(errMessage:boolean) {
    this.errorMessageBoolean = errMessage;
    this.errorMessages = [
      { severity: 'error', summary: 'Error', detail: 'Cant Add/Delete/Update a project.' }
    ]
  }
 }
