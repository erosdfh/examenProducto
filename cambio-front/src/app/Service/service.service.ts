import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  base=environment.url
constructor(
  private http: HttpClient
) { }
  insertEntidad(nombre: number, precio: string, stock: string, categoria: string) {
    return this.http.post(this.base + 'rest/crear?nombre=' + nombre + '&precio=' + precio + '&stock='+stock+ '&categoria='+categoria, []);
  }
  updateEntidad(idProducto: number, nombre: String, precio: string, stock: string, categoria: string) {
    return this.http.put(this.base + 'rest/actualizar?id_producto=' + idProducto+ '&nombre='+nombre + '&precio=' + precio + '&stock=' + stock
      + '&categoria=' + categoria , []);
  }
  listProducto(){
    return this.http.get(this.base + 'rest/listar' );
  }

  listCategoria(){
    return this.http.get(this.base + 'rest/listarCategoria' );
  }
  deleteContribuyente(id:number){
    return this.http.delete(this.base + 'rest/eliminar?idEntidad='+id);
  }
}
