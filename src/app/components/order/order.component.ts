import { Component, OnInit } from '@angular/core';
import { CartsService } from '../cart/carts.service';
import { FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  constructor(public cartsService: CartsService, public fb: FormBuilder) { }

  public cart; // ??? number???
  public colItems = [];
  public totalPrice = 0;
  public user;
  public dataOrder;

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

    this.cartsService.getUser().subscribe(
      (res:any) => {
        this.user = res.result[0];
        console.log(this.user);
      },
      err => {
        console.log(err);
      }
    );

    this.dataOrder = this.fb.group({
      received_city:[,Validators.required],
      received_street:['', [Validators.minLength(2), Validators.maxLength(20), Validators.required]],
      received_date:['', Validators.required],
      received_card:['', [Validators.pattern('[0-9]{16}'), Validators.required]]
    });
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

   public automaticCity() {
    this.dataOrder.controls['received_city'].setValue(this.user.city.toLowerCase());
  }

  public automaticAdress() {
    this.dataOrder.controls['received_street'].setValue(this.user.street);
  }

  public submitOrder() {
    let dateNow = new Date();
    let dateOrder = dateNow.toISOString().split("T")[0];
    this.cartsService.addOrder({...this.dataOrder.value, user: this.user._id, cart: this.cart._id,
      total_price: this.totalPrice, products: this.colItems, user_name: this.user.name + ' ' + this.user.lastname,
      order_date: dateOrder}).subscribe(
      (res: any) => {
        if(res.state = 'success') {
          console.log(res.state);
          // this.ifPopup = true;
          // this.pathPdf = res.receiptPdf;
        } else {
          console.log(res.state);
          // this.ifPopupError = true;
        }
      },
      err => {
        console.log(err);
        // this.ifPopupError = true;
      }
    );
  }
}
