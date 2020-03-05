import { Component, OnInit } from '@angular/core';
import { CartsService } from '../cart/carts.service';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css']
})
export class ShoppingComponent implements OnInit {
  constructor(public cartsService: CartsService) {}

  public cart;
  public colItems = [];
  public totalPrice: Number = 0;

  ngOnInit() {
    this.cartsService.getCart().subscribe(
      (res: any) => {
        if (res.message !== 'No results for cart') {
          this.cart = res.result;
          console.log(this.cart);
          this.takeItems();
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  takeItems() {
   // console.log(this.cart);
    this.cartsService.getItems(this.cart).subscribe(
      (res: any) => {
        if (res.message === 'No results!') {
          this.colItems = [];
          return;
        }
        this.colItems = res.items;
        console.log(res.items);
        let price = 0;
        for (let i = 0; i<res.items.length; i++) {
          price += res.items[i].product.price * res.items[i].quantity;
        }
        this.totalPrice = parseFloat(price.toFixed(1));
        console.log(price);
      },
      err => console.log(err)
    );
  }

  public changeQuantity(data) {
    this.cartsService.changeQuantity(data)
      .subscribe((res: any) => {
        this.takeItems();
      },
      err => {
        console.log(err);
      });
  }

  public addItem(data) {
    if (this.cart === undefined) {
      this.cartsService.addCart().subscribe(
        (res: any) => {
          console.log(res);
          this.cart = res.cart;
          console.log(this.cart);
          this.cartsService.addItem({ ...data, cart: res.cart._id }).subscribe(
            (res: any) => {
              this.takeItems();
            }, err => console.log(err)
          );
        }, err => console.log(err)
      );
    } else {
    this.cartsService.addItem({ ...data, cart: this.cart }).subscribe(
      (res: any) => {
        this.takeItems();
        console.log('item added');
      },
      err => console.log(err)
    );
    }
  }

  public deleteItem(data) {
    console.log(data);
    if (this.colItems.length <= 1) {
      this.cartsService.deleteCart({_id: this.cart}).subscribe(
        (res: any) => {
          // this.cart = -1; // ??
          this.totalPrice = 0;
          this.takeItems();
        },
        err => console.log(err)
      );
    }
    this.cartsService.deleteItem(data).subscribe(
      (res: any) => {
        this.takeItems();
      },
      err => console.log(err)
    );
  }
}
