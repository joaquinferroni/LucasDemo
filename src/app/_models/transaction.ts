
export class Transaction {
    id: string;
    type: string;
    amount: number;
    date: Date;
    /**
     *
     */
    constructor(_id:string,_type:string,_amount:number,_date:Date) {
        this.id=_id;
        this.type=_type;
        this.amount=_amount;
        this.date=_date;
    }
  }