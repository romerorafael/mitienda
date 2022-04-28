import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProdutoService } from 'src/app/service/produto/produto.service';
import { ClienteService } from 'src/app/service/cliente/cliente.service'; 
import { TransacaoService } from 'src/app/service/transaccao/transacao.service';

import { IClientes } from 'src/app/models/Clients.model';
import { IProduct } from 'src/app/models/Product.model';
import { IItem, ITransiction } from 'src/app/models/Transaction.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(
    private productService: ProdutoService,
    private clientService: ClienteService,
    private transacoesService: TransacaoService,
    private router: Router
  ) { }

  public hasCart: boolean = false;
  public products: IProduct[] = new Array<IProduct>();
  public transaction: ITransiction = {total: 0, products: new Array<IItem>()}
  public searchCpf: string = "";
  public client: IClientes | null= {cpf:"", name:""};

  ngOnInit(): void {
    this.hasCart = localStorage.getItem('reserva') != null;
    //@ts-ignore
    const cache = localStorage.getItem('cliente') != null ? this.client = JSON.parse(localStorage.getItem('cliente')) : false;
    if(this.hasCart){
      //@ts-ignore
      this.transaction = JSON.parse(localStorage.getItem('reserva'));
      this.transaction.products.forEach((product:IItem)=>{
        this.productService.GetById(product.productId).subscribe((data:any)=>{
          if(data!=null){
            let produto = data;
            produto.subtotal = product.quantity * produto.price;
            this.products.push(produto);
          }
        })
      });
    }

  }
  
  finishBuy(){
    this.transaction.clientId = this.client?.id;
    this.transacoesService.CreateTransaction(this.transaction).subscribe((data:any)=>{
      if(data != null){
        localStorage.removeItem('reserva');
        this.router.navigate(['/']);
      }
    })
  }

  searchClient(){
    this.clientService.GetClient(this.searchCpf).subscribe((data:any)=>{
      if(data!= null){
        this.client = data;
        localStorage.setItem('cliente', JSON.stringify(this.client));
      }else{
        this.client = null;
      }
    });
  }

}
