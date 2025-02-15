import { Component } from '@angular/core';
import { Producto } from '../producto';
import { ProductoService } from '../producto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-producto-lista',
  standalone: false,
  templateUrl: './producto-lista.component.html',
})
export class ProductoListaComponent {
  productos: Producto[];

  constructor(private productoServicio: ProductoService, private enrutador: Router){}

  ngOnInit(){
    // Cargamos todos los productos
    this.obtenerProductos();
  }

  private obtenerProductos(){
    // Aquí consumimos los datos del Observable:
    this.productoServicio.obtenerProductosLista().subscribe(
      // Asignamos los datos del Observable (el array de tipo Producto) a la variable que hemos creado arriba:
      (datos => {
        this.productos = datos; // Ahora ya podemos iterar el array desde la vista
      })
    )
  }

  editarProducto(id: number){
    this.enrutador.navigate(['editar-producto', id])
  }

  eliminarProducto(id: number){
    this.productoServicio.eliminarProducto(id).subscribe(
      {
        next: (datos) => this.obtenerProductos(),
        error: (errores) => console.log(errores)
      }
    )
  }
}
