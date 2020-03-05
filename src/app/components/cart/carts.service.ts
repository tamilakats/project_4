import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartsService {

  constructor(public http: HttpClient) { }

  public addItem(data) {
    let token = localStorage.getItem('token');
    console.log(data);
    return this.http.post('http://localhost:3000/api/cart/additem', data, {
      headers: { 'Content-Type': 'application/json', authorization: token }
    });
  }
  public addCart() {
    let token = localStorage.getItem('token');
    return this.http.post('http://localhost:3000/api/cart/addcart', {
      headers: { 'Content-Type': 'application/json', authorization: token }
    });
  }
  public getCart() {
    let token = localStorage.getItem('token');
    return this.http.post('http://localhost:3000/api/cart/cart', {
      headers: { 'Content-Type': 'application/json', authorization: token }
    });
  }
  public deleteCart(data) {
    let token = localStorage.getItem('token');
    return this.http.post('http://localhost:3000/api/cart/deletecart', data, {
      headers: { 'Content-Type': 'application/json', authorization: token }
    });
  }

  public getItems(data) {
    // console.log(data);
    let token = localStorage.getItem('token');
    return this.http.post('http://localhost:3000/api/cart/items', data, {
      headers: { 'Content-Type': 'application/json', authorization: token }
    });
  }

  public deleteItem(data) {
    let token = localStorage.getItem('token');
    return this.http.post('http://localhost:3000/api/cart/deleteitem', data, {
      headers: { 'Content-Type': 'application/json', authorization: token }
    });
  }

  public getUser() {
    let token = localStorage.getItem('token');
    return this.http.get('http://localhost:3000/api/user/user', {
      headers: { 'Content-Type': 'application/json', authorization: token }
    });
  }

  public addOrder(data) {
    let token = localStorage.getItem('token');
    return this.http.post('http://localhost:3000/api/cart/addorder', data, {
      headers: { 'Content-Type': 'application/json', authorization: token }
    });
  }

  // ??
  // public viewCart(data) {
  //   let token = localStorage.getItem('token');
  //   return this.http.post('http://localhost:3000/api/cart', data, {
  //     headers: { 'Content-Type': 'application/json', authorization: token }
  //   });
  // }

  public changeQuantity(data) {
    let token = localStorage.getItem('token');
    return this.http.post('http://localhost:3000/api/cart/changequantity', data, {
      headers: { 'Content-Type': 'application/json', authorization: token }
    });
  }
}
