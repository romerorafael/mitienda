import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './views/cart/cart.component';
import { ErrorPageComponent } from './views/error-page/error-page.component';
import { HomeComponent } from './views/home/home.component';
import { ProductDetailComponent } from './views/product-detail/product-detail.component';
import { ProductsComponent } from './views/products/products.component';
import { RegisterComponent } from './views/register/register.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'produtos', component: ProductsComponent},
  {path: 'produtos/:id', component: ProductDetailComponent},
  {path: 'carrinho', component: CartComponent},
  {path: 'registro', component: RegisterComponent},
  {path: '**', component: ErrorPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
