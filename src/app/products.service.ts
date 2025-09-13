import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Product } from './product';
import { Observable, map, of, subscribeOn, tap } from 'rxjs';
import { APP_SETTINGS } from './app.settings';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private http: HttpClient) { }

  private productsUrl = inject(APP_SETTINGS).apiUrl + '/products';

  private products: Product[] = [];

  getProducts(): Observable<Product[]> {
    const options = new HttpParams()
      .set('limit', 10)
      .set('page', 1);
    return this.http.get<Product[]>(this.productsUrl, {
      params: options
    }).pipe(map(products => {
      this.products = products;
      return products;
    }));
  }

  getProduct(id: number): Observable<Product> {
    const product = this.products.find(p => p.id === id);
    return of(product!);
  }

  addProduct(newProduct: Partial<Product>): Observable<Product> {
    return this.http.post<Product>(
      this.productsUrl, newProduct)
      .pipe(map(product => {
        this.products.push(product);
        return product;
      }))
  }

  updateProduct(id: number, price: number): Observable<Product> {
    return this.http.patch<Product>(`${this.productsUrl}/${id}`, {
      price
    }).pipe(
      map(product => {
        const index = this.products.findIndex(p => p.id === id);
        this.products[index].price = price;
        return product;
      })
    )
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.productsUrl}/${id}`)
      .pipe(
        tap(() => {
          const index = this.products.findIndex(p => p.id === id);
          this.products.splice(index, 1);
        })
      )
  }
}
