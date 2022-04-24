import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { User } from '../_models/user';
import { UsersService } from '../_services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit,AfterViewInit {

  displayedColumns: string[] = ['id', 'name', 'surname','actions'];
  dataSource: MatTableDataSource<User>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private router: Router
    ,private usersService: UsersService
    ) {
     const users = new Array<User>();
     users.push(new User("8","test","fdsafsa",19));
     this.dataSource = new MatTableDataSource(users);
  }
  ngOnInit(): void {
    this.loadUsers();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadUsers(){
    this.usersService.getAll().subscribe(users=>{
      this.dataSource = new MatTableDataSource(users);
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  viewAccounts(customerId: number){
    this.router.navigate(['accounts',customerId]);
  }
}

