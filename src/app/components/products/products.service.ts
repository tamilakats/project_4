import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(public http: HttpClient) {}

  public getCategories() {
    const token = localStorage.getItem('token');
    return this.http.get('http://localhost:3000/api/product/categories',
    {
      headers: { 'Content-Type': 'application/json', authorization: token }
    }
    );
  }

  public getProducts(_id) {
    const token = localStorage.getItem('token');
    //console.log(category_id);
    return this.http.post('http://localhost:3000/api/product/products', _id,
    {
      headers: { 'Content-Type': 'application/json', authorization: token }
    }
    );
  }

  public searchProduct(newSearch) {
    const token = localStorage.getItem('token');
    return this.http.post('http://localhost:3000/api/product/search', { newSearch: newSearch },
    {
      headers: { 'Content-Type': 'application/json', authorization: token }
    }
    );
  }

  // changeQuantity???
}
