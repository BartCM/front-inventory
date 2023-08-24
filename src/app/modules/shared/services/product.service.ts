import { HttpClient } from '@angular/common/http';
import { emitDistinctChangesOnlyDefaultValue } from '@angular/compiler';
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

  /**
   * actualiza los productos
   */

  updateProduct(body:any, id:any){
    const endpoint = `${base_url}/products/${id}`;
    return this.http.put(endpoint, body);
  }

  /**
   * borra el producto
   */

  deleteProduct(id: any){
    const endpoint = `${base_url}/products/${id}`;
    return this.http.delete(endpoint);
  }

  /**
   * busca por nombre
   */

  getProductByName(name: any){
    const endpoint = `${base_url}/products/filter/${name}`;
    return this.http.get(endpoint);
  }
}
