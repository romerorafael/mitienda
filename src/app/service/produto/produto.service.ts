import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(private http: HttpClient) { }

  //Retorna todos os produtos cadastrados
  GetAll(){
    return this.http.get( environment.Api_Path + '/api/produtos');
  }

  //Retorna um porduto a partir do seu Id
  GetById(id:string){
    return this.http.get ( environment.Api_Path + `/api/produtos/${id}`)
  }

}
