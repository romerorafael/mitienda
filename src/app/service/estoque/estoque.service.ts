import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class EstoqueService {

  constructor(private http: HttpClient) { }

  //Retorna o estoque de determinado produto, pego pelo Id do produto
  GetByProductId(id:string){
    return this.http.get( environment.Api_Path + `/api/estoques/${id}`);
  }
}
