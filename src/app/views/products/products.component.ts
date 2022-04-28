import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from 'src/app/models/Product.model';
import { ProdutoService } from 'src/app/service/produto/produto.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private produtoService:ProdutoService) { }

  public products: IProduct[] = new Array<IProduct>();
  public backUpList: IProduct[] = new Array<IProduct>();
  public types: string[] = new Array<string>();
  public showCategory: boolean = false; 
  public showMore: boolean = true;

  ngOnInit(): void {
    this.produtoService.GetAll().subscribe((data:any)=>{
      if(data!=null){
        this.products = data;
        this.products.forEach((product:IProduct)=>{
          product.hide = false;
          this.types.push(product.type);
        })
        this.types = [... new Set(this.types)];
        this.backUpList = [...this.products];

      }
    })
  }

  searchForType(type:string){
    if(type==="all"){
      this.products.forEach((produto)=>{
        produto.hide = false;
      });
    }else{
      this.products.forEach((produto)=>{
        produto.hide = !(produto.type === type);
      });
    }
  }

  searchText(e: any){
    let searchList = new Array<IProduct>();
    const searchWord = e.target.value.toLocaleLowerCase();
    if(searchWord.length > 0)
    {
      this.products.forEach((produto)=>{
        produto.hide = !(produto.name.includes(searchWord) || produto.productId.includes(searchWord));
      });
    }else if(searchWord.length == 0){
      this.products.forEach((produto)=>{
        produto.hide = false;
      });
    }
  }

  showCategories(){
    this.showCategory = !this.showCategory;
    this.showMore = !this.showMore;
  }
}
