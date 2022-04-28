import { Component, OnInit } from '@angular/core';

import { ProdutoService } from 'src/app/service/produto/produto.service';

import { IProduct } from '../../models/Product.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  constructor(private productService: ProdutoService) { 
  }

  public produtos: IProduct[] = new Array();

  ngOnInit(): void {
    this.productService.GetAll().subscribe((data:any)=>{
      this.produtos = this.shuffleArray(data).slice(0,3) ;
    })
  }

  shuffleArray(arr:any[]) {
    // Loop em todos os elementos
    for (let i = arr.length - 1; i > 0; i--) {
            // Escolhendo elemento aleatório
        const j = Math.floor(Math.random() * (i + 1));
        // Reposicionando elemento
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    // Retornando array com aleatoriedade
    return arr;
}

}
