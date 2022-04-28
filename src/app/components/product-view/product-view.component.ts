import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IProduct } from 'src/app/models/Product.model';

@Component({
  selector: 'product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {

  //@ts-ignore
  @Input produto: IProduct;

  constructor(private router: Router) { }

  ngOnInit(): void { }

  goToProduct(id:string){
    // const url = '/produtos/' + id;
    this.router.navigate(['/produtos', id]);
  }
}
