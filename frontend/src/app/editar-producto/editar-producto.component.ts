import { Component } from '@angular/core';
import { Producto } from '../producto';
import { ProductoService } from '../producto.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editar-producto',
  standalone: false,
  templateUrl: './editar-producto.component.html',
})
export class EditarProductoComponent {
  producto: Producto = new Producto();
  id: number;

  // El objeto ActivatedRoute se necesita para poder recibir el id del producto a editar
  constructor(private productoServicio: ProductoService, private ruta: ActivatedRoute, 
    private enrutador: Router){}

  ngOnInit(){
    // Obtenemos el valor de id de la ruta, es decir, de la URL que se recibe en el componente:
    this.id = this.ruta.snapshot.params['id'];
    this.productoServicio.obtenerProductoPorId(this.id).subscribe(
      {
        next: (datos) => this.producto = datos,
        error: (errores: any) => console.log(errores)
      }
    )
  }

  onSubmit(){
    this.guardarProducto();
  } 

  guardarProducto(){
    this.productoServicio.editarProducto(this.id, this.producto).subscribe(
      {
        next: (datos) => this.irProductoLista(),
        error: (errores) => console.log(errores)
      }
    )
  }

  irProductoLista(){
    this.enrutador.navigate(['/productos']);
  }
}
