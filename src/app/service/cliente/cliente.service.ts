import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) { }

  //Retorna o cliente a partir do seu cpf
  GetClient(cpf:string){
    return this.http.get(environment.Api_Path + `/api/clientes/${cpf}`)
  }
}
