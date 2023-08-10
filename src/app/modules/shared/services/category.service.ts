import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const base_url = "http://localhost:8083/api/v1";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  /**
   *
   * muestra todas las categorias
   */
  getCategories(){

    const endpoint = `${base_url}/categories`;
    return this.http.get(endpoint);

  }

  /**
   * Guarda las categorias
   */
  saveCategorie(body:any){

    const endpoint = `${base_url}/categories`;
    return this.http.post(endpoint,body);
  }

  /**
   * Actualiza las categorias
   */

  updateCategorie(body:any, id:any){
    const endpoint = `${base_url}/categories/ ${id}`;
    return this.http.put(endpoint,body);
  }
}
