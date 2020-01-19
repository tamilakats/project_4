import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(public productsService: ProductsService) { }

  public myProducts;

  ngOnInit() {
    this.productsService.allProducts()
      .subscribe(myProducts => {
        this.myProducts = myProducts;
        // err => console.log(err)
      });
  }
}
