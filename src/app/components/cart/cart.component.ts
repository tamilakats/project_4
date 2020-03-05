import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CartsService} from '../cart/carts.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(public cartsService: CartsService) { }

  @Input() cart; // ??? number???
  @Input() colItems;
  @Input() totalPrice;
  @Output() removeItem = new EventEmitter();

  ngOnInit() {}

  public deleteItem(data) {
    console.log(data);
    this.removeItem.emit({_id: data});
  }

  public deleteAll() {
    let i = this.colItems.length;
    let delInterval = setInterval(() => {
      if (i === 0 ) {
        clearInterval(delInterval);
        return;
      }
      this.deleteItem (this.colItems[i-1]._id);
      i--;
    }, 300);
  }
}
