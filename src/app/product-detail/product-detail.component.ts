import { CommonModule } from '@angular/common';
import {
  Component,
  input,
  output,
  OnChanges,
  OnInit
} from '@angular/core';
import { Product } from '../product';
import { Observable, switchMap } from 'rxjs';
import { ProductsService } from '../products.service';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../cart.service';
import { PriceMaximumDirective } from '../price-maximum.directive';

@Component({
  selector: 'app-product-detail',
  imports: [
    CommonModule, 
    FormsModule,
    PriceMaximumDirective
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {
  id = input<string>();
  product$: Observable<Product> | undefined;
  price: number | undefined;

  constructor(
    private productService: ProductsService, 
    public authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService
  ) { }

  addToCart(id: number) {
    this.cartService.addProduct(id).subscribe();
  }
  
  changePrice(product: Product) {
    this.productService.updateProduct(
      product.id,
      this.price!
    ).subscribe(() => this.router.navigate(['/products']));
  }

  remove(product: Product) {
    this.productService.deleteProduct(product.id).subscribe(() => {
      this.router.navigate(['/products'])
    });
  }

  ngOnInit(): void {
    this.product$ = this.productService.getProduct(Number(this.id()!));
  }
  
}
