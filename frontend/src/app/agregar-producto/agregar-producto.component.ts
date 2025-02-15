import { Component } from '@angular/core';
import { Producto } from '../producto';
import { ProductoService } from '../producto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar-producto',
  standalone: false,
  templateUrl: './agregar-producto.component.html',
})
export class AgregarProductoComponent {

  // Creamos el producto para poder accederlo desde el formulario de agregar producto:
  producto: Producto = new Producto();

  constructor(private productoServicio: ProductoService, private enrutador: Router){}

  onSubmit(){
    this.guardarProducto();
  }

  guardarProducto(){
    // El producto que pasamos como parámetro ya está disponible porque el formulario ha hecho submit:
    this.productoServicio.agregarProducto(this.producto).subscribe(
      {
        next: (datos) => {
          this.irListaProductos();
        },
        error: (error: any) => {console.log(error)}
      }
    )
  }

  irListaProductos(){
    this.enrutador.navigate(['/productos']);
  }

}
