import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const base_url = "http://localhost:8083/api/v1";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  /**
   * Muestra todos los productos
   */
  getProducts(){
    const endpoint = `${base_url}/products`;
    return this.http.get(endpoint);
  }

  /**
   * guarda los productos
   */

  saveProduct(body: any){
    const endpoint = `${base_url}/products`;
    return this.http.post(endpoint, body);
  }
}
