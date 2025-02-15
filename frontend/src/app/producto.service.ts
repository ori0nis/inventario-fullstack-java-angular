import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from './producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private urlBase = "http://localhost:8080/inventario-app/productos";

  // Primer paso para poder realizar peticiones al backend:
  constructor(private clienteHttp: HttpClient) { }

  // Esta es una petición asíncrona que no devuelve un valor de inmediato, para obtener los valores tenemos que hacer subscribe en otro método (desde producto-lista):
  obtenerProductosLista(): Observable<Producto[]>{
    return this.clienteHttp.get<Producto[]>(this.urlBase);
  }

  agregarProducto(producto: Producto): Observable<Object>{
    return this.clienteHttp.post(this.urlBase, producto);
  }

  obtenerProductoPorId(id: number){
    return this.clienteHttp.get<Producto>(`${this.urlBase}/${id}`);
  }

  editarProducto(id: number, producto: Producto): Observable<Object>{
    return this.clienteHttp.put(`${this.urlBase}/${id}`, producto);
  }

  eliminarProducto(id: number): Observable<Object>{
    return this.clienteHttp.delete(`${this.urlBase}/${id}`);
  }
}
