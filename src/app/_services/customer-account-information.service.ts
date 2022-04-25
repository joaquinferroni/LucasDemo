import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerAccountInformation } from '../_models/customerAccountInformation';

@Injectable({
  providedIn: 'root'
})
export class CustomerAccountInformationService {

  constructor(private http: HttpClient) { }

  getAll(accountId:number):Observable<CustomerAccountInformation>{
    return this.http.get<CustomerAccountInformation>(`/accounts/${accountId}/transactions`);
  }
}
