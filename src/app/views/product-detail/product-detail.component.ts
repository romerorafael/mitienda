import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProduct } from 'src/app/models/Product.model';
import { IStock } from 'src/app/models/Stock.model';
import { ITransiction, IItem } from 'src/app/models/Transaction.model';

import { EstoqueService } from 'src/app/service/estoque/estoque.service';
import { ProdutoService } from 'src/app/service/produto/produto.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  public id: string = "";
  public stock: IStock  = {productId: "", productName: "", quantity:0};
  public product: IProduct = {productId: "", name:"", type: "", image: "", price: 0};
  public quantity: number = 1;

  constructor(
    private router: ActivatedRoute,
    private productService: ProdutoService,
    private estoqueService: EstoqueService
  ) { }

  ngOnInit(): void {
    const productID = this.router.snapshot.paramMap.get('id') as string;

    this.estoqueService.GetByProductId(productID).subscribe((dataStock:any)=>{
      if(dataStock != null){
        this.stock = dataStock;
      }
    });

    this.productService.GetById(productID).subscribe((dataProduct:any)=>{
      if(dataProduct != null){
        this.product = dataProduct;
      } 
    });

  }

  changeQuantity(type:string){
    if(type==="plus"){
      this.quantity++;
      this.quantity = this.quantity <= this.stock.quantity ? this.quantity : this.stock.quantity;
    }else{
      this.quantity--;
      this.quantity = this.quantity >= 0 ? this.quantity : 0;
    }
  }
  
  reserveProduct(product:IProduct ){
    let transictionPreview: ITransiction = { total: 0, products: new Array<IItem>()};
    let transiction: string | null = localStorage.getItem ("reserva");
    let foundProduct = false;

    if(transiction != null )
      transictionPreview = JSON.parse(transiction) as ITransiction;
      
    transictionPreview.total += product.price * this.quantity;
    const addProduct: IItem = {productId: product.productId, quantity: this.quantity};
    transictionPreview.products.forEach((produtos) => {
      if(addProduct.productId == produtos.productId){
        foundProduct = true;
        produtos.quantity += addProduct.quantity;
      }
    });
    if(!foundProduct)
      transictionPreview.products.push(addProduct);

    localStorage.setItem('reserva', JSON.stringify(transictionPreview));
  }

  
}
