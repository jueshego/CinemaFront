import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InsertarClienteComponent } from './Cliente/Insertar/insertar-cliente.component';
import { ClientesComponent } from './Cliente/clientes/clientes.component'
import { InsertarPeliculaComponent } from './Pelicula/Insertar/insertar-pelicula.component'
import { ListarPeliculasComponent } from './Pelicula/Listar/listar-peliculas/listar-peliculas.component'
import { ListadoFiltroComponent } from './Pelicula/listado-filtro/listado-filtro.component';

const routes: Routes = [
  { path: 'clientes', component: ClientesComponent },
  { path: 'insertar-pelicula', component: InsertarPeliculaComponent },
  { path: 'listar-peliculas', component: ListarPeliculasComponent },
  { path: 'listado-filtro', component: ListadoFiltroComponent },
  { path: 'editar-pelicula/:peliculaId', component: InsertarPeliculaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
