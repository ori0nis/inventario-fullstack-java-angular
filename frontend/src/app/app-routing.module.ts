import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductoListaComponent } from './producto-lista/producto-lista.component';
import { AgregarProductoComponent } from './agregar-producto/agregar-producto.component';
import { EditarProductoComponent } from './editar-producto/editar-producto.component';

// Aquí definimos las rutas de nuestra app:
const routes: Routes = [
  {path: 'productos', component: ProductoListaComponent},
  {path: '', redirectTo: 'productos', pathMatch: 'full'},
  {path: 'agregar-producto', component: AgregarProductoComponent},
  {path: 'editar-producto/:id', component: EditarProductoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
