import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransferService {

  constructor(private http: HttpClient) { }

  getTransferBalance(searchValue: any) {
    return this.http.get<any>('assets/profileDetails.json');
  }
}

