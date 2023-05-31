import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './NavBar/navbar/navbar.component';
import { InsertarClienteComponent } from './Cliente/Insertar/insertar-cliente.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ClientesComponent } from './Cliente/clientes/clientes.component';
import { ListarComponent } from './Cliente/listar/listar.component';
import { StoreModule } from '@ngrx/store';
import { InsertarPeliculaComponent } from './Pelicula/Insertar/insertar-pelicula.component';
import { ListarPeliculasComponent } from './Pelicula/Listar/listar-peliculas.component'
import { DatePipe } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ListadoFiltroComponent } from './Pelicula/listado-filtro/listado-filtro.component';
import { FilterPipe } from './pipes/filter.pipe';
import { NgxPaginationModule } from 'ngx-pagination'
import { indRegsReducer } from './Reducers/store.reducer';
import { CardPeliculaComponent } from './Pelicula/CardPelicula/card-pelicula/card-pelicula.component';
import { InsertarSalaComponent } from './Sala/insertar-sala/insertar-sala.component';
import { ListadoSalasComponent } from './Sala/listado-salas/listado-salas.component';
import { SillasComponent } from './sillas/sillas.component';
import { FuncionesComponent } from './Funciones/insertar/funciones.component';
import { ListarFuncionesComponent } from './Funciones/listar/listar-funciones.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    InsertarClienteComponent,
    ClientesComponent,
    ListarComponent,
    InsertarPeliculaComponent,
    ListarPeliculasComponent,
    ListadoFiltroComponent,
    FilterPipe,
    CardPeliculaComponent,
    InsertarSalaComponent,
    ListadoSalasComponent,
    SillasComponent,
    FuncionesComponent,
    ListarFuncionesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    NgxPaginationModule,
    StoreModule.forRoot({
      storeIndRegs : indRegsReducer
    })
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
