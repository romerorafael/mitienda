import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ITransiction } from 'src/app/models/Transaction.model';


@Injectable({
  providedIn: 'root'
})
export class TransacaoService {

  constructor(private http: HttpClient) { }

  //Cria uma nova transação
  CreateTransaction(transaction: ITransiction){
    return this.http.post( environment.Api_Path + `/api/transacoes`, JSON.stringify(transaction), {
      headers: new HttpHeaders().set('Content-Type', 'application/json')});
  }
}
