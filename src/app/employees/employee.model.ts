/*
    Employee Class which contains:
    id as number
    name as string or any
    surname as string or any
    dateOfBirth as Date or any
    phoneNumber as string or any
    position as string or any
*/
export class Employee {
    id?:number;
    name:string | any;
    surname:string | any;
    dateOfBirth:Date | any;
    phoneNumber:string | any;
    position:string | any;

    /*
        Constructs the above values with the values that passed
        into the constructor method.
    */
    constructor(name:string,  surname:string, dateOfBirth:Date, phoneNumber:string,  position:string, id?:number){
        this.name = name;
        this.surname = surname;
        this.dateOfBirth = dateOfBirth;
        this.phoneNumber = phoneNumber;
        this.position = position;
        this.id = id;
    }
}