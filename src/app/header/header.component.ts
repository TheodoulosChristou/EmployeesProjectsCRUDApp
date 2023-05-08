import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  // create items array to store in the menubar HTML element.
  items:MenuItem[] = [];

  ngOnInit(): void {

    // store items elements into the items array. 
    // Uses the label tag and the routerLink for navigation.
    this.items = [
      {
        label:'Employees',
        routerLink:'/employees',
      },
      {
        label:'Projects',
        routerLink:'/projects',
        
      },
      {
        label:'Project Assignments',
        routerLink:'/project-assignments'
      }
    ]
  }
}
