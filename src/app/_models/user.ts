
export class User {
    id: string;
    name: string;
    surname: string;
    customerId: number;
    /**
     *
     */
    constructor(_id:string,_name:string,_surname:string,_customerId:number) {
        this.id=_id;
        this.name=_name;
        this.surname=_surname;
        this.customerId=_customerId;
    }
  }