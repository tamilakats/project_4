import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ProductsService } from '../products/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(public productsService: ProductsService) { }

  @Output() addItem = new EventEmitter();
  public allCategories;
  public category = 0;
  public catProducts;
  public newSearch = '';
  public searchedProduct;
  public popupProduct;
  public ifPopup = false;
  public quantity = 1;

  ngOnInit() {
    this.productsService.getCategories()
      .subscribe(allCategories => {
        this.allCategories = allCategories;
      }, err => console.log(err)
    );
  }

  public changeCategory(thisCategory) {
    console.log('clicked');
    this.category = thisCategory;
    console.log(thisCategory)
    this.productsService.getProducts({_id:thisCategory})
      .subscribe(catProducts => {
        this.catProducts = catProducts;
        console.log(catProducts);
      }, err => console.log(err)
    );
  }

  public search() {
    this.category = 1;
    this.productsService.searchProduct(this.newSearch)
      .subscribe(searchedProduct => {
        this.searchedProduct = searchedProduct;
        console.log(searchedProduct);
      }, err => console.log(err)
    );
  }

  public popup(product) {
    this.popupProduct = product;
    this.ifPopup = true;
  }

  public closePopup() {
    this.ifPopup = false;
  }

  public changeQuantity(x) {
    if (x === '+') {this.quantity <10? this.quantity++: 'no'}
    else if (x === '-') {this.quantity >1? this.quantity--: 'no'}
  }

  public addToCart(product) {
    this.addItem.emit({product, quantity: this.quantity});
    this.ifPopup = false;
    this.quantity = 1;
  }
}
