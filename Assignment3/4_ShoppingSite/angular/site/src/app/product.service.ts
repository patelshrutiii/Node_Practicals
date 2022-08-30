import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Product from './product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  uri='http://localhost:3333/product'
  constructor(private http: HttpClient) { }

  addProduct(name :string, price :number,mdate :string,brand:string,description:string) {
    const obj = {
      name: name,
      price: price,
      mdate:mdate,
      brand:brand,
      description:description,
      // img:img
    };
    console.log(obj);
    this.http.post(`${this.uri}`, obj).subscribe(res => console.log('Done'));
  }

  getProduct() :Observable<Product[]> {    
    return this.http.get<Product[]>(`${this.uri}`);
  }

  editProduct(id :any) {
    return this
            .http
            .get(`${this.uri}/${id}`);
  }

  updateProduct(id :any,name :string, price :number,mdate :string,brand:string,description:string) {

      const obj = {
          
        name: name,
        price: price,
        mdate:mdate,
        brand:brand,
        description:description,
        // img:img
        };
      this
        .http
        .put(`${this.uri}/${id}`, obj)
        .subscribe(res => console.log('Done'));
    }

    deleteProduct(id :any) {
      return this
                .http
                .delete(`${this.uri}/${id}`);
    }
}
