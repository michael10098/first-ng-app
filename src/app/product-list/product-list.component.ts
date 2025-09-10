import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Product } from '../product';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { SortPipe } from '../sort.pipe';
import { ProductsService } from '../products.service';
import { Subscription } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-list',
  imports: [ProductDetailComponent, SortPipe, AsyncPipe],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  products$: Observable<Product[]> | undefined;
  selectedProduct: Product | undefined;
  private productsSub: Subscription | undefined;

  constructor(private productService: ProductsService) {}
  
  onAdded() {
    alert(`${this.selectedProduct?.title} added to the cart!`);
  }

  ngOnInit(): void {
    this.getProducts();
  }

  private getProducts() {
    this.products$ = this.productService.getProducts();
  }

  private destroyRef = inject(DestroyRef);
}
