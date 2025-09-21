import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { Router } from '@angular/router';
import { 
  FormControl, 
  FormGroup, 
  ReactiveFormsModule, 
  FormBuilder,
  Validators,
} from '@angular/forms'
import { priceMaximumValidator } from '../price-maximum.validator';
import { MatButton } from '@angular/material/button'
import { MatInput } from '@angular/material/input';
import { MatFormField, MatError, MatLabel } from '@angular/material/input';
import { MatSelect, MatOption } from '@angular/material/select';

@Component({
  selector: 'app-product-create',
  imports: [
    ReactiveFormsModule, 
    MatButton,
    MatInput,
    MatFormField,
    MatError,
    MatLabel,
    MatSelect,
    MatOption
  ],
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.css'
})
export class ProductCreateComponent implements OnInit {
  productForm = new FormGroup({
    title: new FormControl('', {
      nonNullable: true, 
      validators: Validators.required
    }),
    price: new FormControl<number | undefined>(undefined, {
      nonNullable: true,
      validators: [
        Validators.required, 
        Validators.min(1),
        priceMaximumValidator(1000)
      ]
    }),
    category: new FormControl('', { nonNullable: true })
  });

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private builder: FormBuilder) { }

  createProduct() {
    this.productsService.addProduct(this.productForm!.value).subscribe(() => {
      this.router.navigate(['/products']);
    });
  }

  ngOnInit(): void {
    this.productForm.controls.category.valueChanges.subscribe(() => {
      this.productForm.controls.price.reset();
    })
  }
}
