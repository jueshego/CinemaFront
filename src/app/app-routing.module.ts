import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientesComponent } from './Cliente/clientes/clientes.component'
import { InsertarPeliculaComponent } from './Pelicula/Insertar/insertar-pelicula.component'
import { ListarPeliculasComponent } from './Pelicula/Listar/listar-peliculas.component'
import { ListadoFiltroComponent } from './Pelicula/listado-filtro/listado-filtro.component';
import { InsertarSalaComponent } from './Sala/insertar-sala/insertar-sala.component';

const routes: Routes = [
  { path: 'clientes', component: ClientesComponent },
  { path: 'insertar-pelicula', component: InsertarPeliculaComponent },
  { path: 'listar-peliculas', component: ListarPeliculasComponent },
  { path: 'listado-filtro', component: ListadoFiltroComponent },
  { path: 'editar-pelicula/:peliculaId', component: InsertarPeliculaComponent },
  { path: 'insertar-sala', component: InsertarSalaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
