import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { CartComponent } from './cart/cart.component';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { authGuard } from './auth.guard';
import { checkoutGuard } from './checkout.guard';
import { productsResolver } from './products.resolver';

export const routes: Routes = [
    {   path: 'user', 
        loadChildren: () => import('./user.routes'),
        canMatch: [authGuard]
    },
    {
        path: 'products',
        component: ProductListComponent,
        resolve: {
            products: productsResolver
        }
    },
    {
        path: 'cart',
        component: CartComponent,
        canActivate: [authGuard],
        canDeactivate: [checkoutGuard]
    },
    { path: 'products/new', component: ProductCreateComponent },
    { path: 'products/:id', component: ProductDetailComponent },
    { path: '', redirectTo: 'products', pathMatch: 'full' },
    { path: '**', redirectTo: 'products' }
];
