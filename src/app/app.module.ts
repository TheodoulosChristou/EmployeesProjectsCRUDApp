import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MenubarModule } from 'primeng/menubar';
import { EmployeesComponent } from './employees/employees.component';
import { RouterModule } from '@angular/router';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import { EmployeeEditComponent } from './employees/employee-edit/employee-edit.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeSerivce } from './employees/employee.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputNumberModule } from 'primeng/inputnumber';
import { MessagesModule } from 'primeng/messages';
import { DialogModule } from 'primeng/dialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectListComponent } from './projects/project-list/project-list.component';
import { ProjectEditComponent } from './projects/project-edit/project-edit.component';
import { ProjectService } from './projects/project.service';
import { ProjectAssignmentsComponent } from './project-assignments/project-assignments.component';
import { ProjectsTableComponent } from './project-assignments/projects-table/projects-table.component';
import { SidebarModule } from 'primeng/sidebar';
import { EmployeesPickListComponent } from './employees-pick-list/employees-pick-list.component';
import { PickListModule } from 'primeng/picklist';
import { DragDropModule } from 'primeng/dragdrop';
import { InputMaskModule } from 'primeng/inputmask';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    EmployeesComponent,
    EmployeeListComponent,
    EmployeeEditComponent,
    ProjectsComponent,
    ProjectListComponent,
    ProjectEditComponent,
    ProjectAssignmentsComponent,
    ProjectsTableComponent,
    EmployeesPickListComponent
  ],
  imports: [
    BrowserModule,
    MenubarModule,
    RouterModule.forRoot([
      {path:'', component:EmployeesComponent},
      {path:'employees', component:EmployeesComponent},
      {path:'projects', component:ProjectsComponent},
      {path:'project-assignments',component:ProjectAssignmentsComponent},
      {path:'employee-pick-list', component: EmployeesPickListComponent}
    ]),
    TableModule,
    ButtonModule,
    HttpClientModule,
    InputTextModule,
    CalendarModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    InputNumberModule,
    MessagesModule,
    DialogModule,
    ProgressSpinnerModule,
    SidebarModule,
    PickListModule,
    DragDropModule,
    InputMaskModule,
    ToastModule,
    ConfirmDialogModule
  ],
  
  providers: [EmployeeSerivce, ProjectService],
  bootstrap: [AppComponent]
})
export class AppModule { }
