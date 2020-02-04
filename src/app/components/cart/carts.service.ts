import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartsService {

  constructor(public http: HttpClient) { }

  public addItem(data) {
    let token = localStorage.getItem('token');
    return this.http.post('http://localhost:3000/api/cart', data, {
      headers: { 'Content-Type': 'application/json', authorization: token }
    });
  }
}
