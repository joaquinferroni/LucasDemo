import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NewAccountComponent } from '../new-account/new-account.component';
import { Account } from '../_models/account';
import { Transaction } from '../_models/transaction';
import { LoadingService } from '../_services/loading.service';
import { NotificationService } from '../_services/notification.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit,AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['type', 'amount', 'date'];
  dataSource = new MatTableDataSource<Transaction>([]);
  selectedAccountId:string = "-1";
  accounts: Account[] = [];
  customerId:number = 8;

  constructor(
    private loadingService:LoadingService
    ,private notificationService:NotificationService
    ,private dialog: MatDialog
    ,private router: Router
    ,private route: ActivatedRoute
    ) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.customerId = params['customerId'];
      console.log("cusomer: "+this.customerId);
    });
    this.accounts.push(new Account("1","Account 1",100,8));
    this.accounts.push(new Account("12","Account 2",1100,1));
    this.accounts.push(new Account("13","Account 3",2100,1));
    this.accounts.push(new Account("14","Account 4",3100,1));
    this.accounts.push(new Account("15","Account 5",4100,1));
    this.accounts.push(new Account("16","Account 6",5100,8));
    this.accounts.push(new Account("17","Account 7",6100,8));
    this.accounts.push(new Account("18","Account 8",7100,8));
    this.accounts.push(new Account("21","Account 11",8100,8));
    this.accounts.push(new Account("31","Account 12",9100,8));
    this.accounts.push(new Account("41","Account 13",100.78,8));
    this.accounts=this.accounts.filter(a=>a.customerId==this.customerId);
  }

  backToUsers(){
    this.router.navigate(["/"]);
  }

  viewTransactions(accountId: string){
    this.loadingService.show();
    setTimeout(() => {
      this.selectedAccountId=accountId;
      this.loadingService.hide();
    }, 1000);
  }

  newAccount(){
    const dialogRef = this.dialog.open(NewAccountComponent, {
      width: '300px',
    data: {name: 'this.name', animal: 'this.animal'},
    });

    dialogRef.afterClosed().subscribe(account => {
      if(!account) return;
      console.log('The dialog was closed');
      account.customerId = this.customerId;
      this.accounts.push(account);
      this.notificationService.success("Account created successfuly");
    });
  }
  addAmount(){
    
  }
}
