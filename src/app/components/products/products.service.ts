import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {

  constructor(public http: HttpClient) {}

  public allProducts() {
    return this.http.get('http://localhost:3000/api/products');
  }
}


