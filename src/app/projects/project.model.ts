/*
    Project Class which contains:
    id as number
    projectName as string or any
    clientName as string or any
    duration as string or any
    initiationDate as Date or any
*/
export class Project {
    id?:number;
    projectName:string | any;
    clientName:string | any;
    duration:string | any;
    initiationDate: Date | any;

     /*
        Constructs the above values with the values that passed
        into the constructor method.
    */
    constructor(projectName:string, clientName:string, duration:string, initiationDate:Date, id?:number){
        this.id = id;
        this.projectName = projectName;
        this.clientName = clientName;
        this.duration = duration;
        this.initiationDate = initiationDate;
    }
}