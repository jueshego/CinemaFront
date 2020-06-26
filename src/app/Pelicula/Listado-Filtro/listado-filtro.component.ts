import { Component, OnInit } from '@angular/core';
import { Pelicula } from 'src/app/Models/Pelicula';
import { PeliculaService } from 'src/app/Services/pelicula.service';
import * as $ from 'jquery'
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IndicadorRegistros } from 'src/app/Interfaces/IndicadorRegistros'
import * as action from './../../Reducers/store.actions'

@Component({
  selector: 'app-listado-filtro',
  templateUrl: './listado-filtro.component.html',
  styleUrls: ['./listado-filtro.component.css']
})
export class ListadoFiltroComponent implements OnInit {

  peliculas: Pelicula[]
  id: number 
  titulo: string 
  estreno: Date 
  poster: string
  filtro: ''
  pageActual: number = 1 
  loading: boolean 

  constructor(private peliculaService: PeliculaService, private router: Router,
    private store: Store<{ storeIndRegs: IndicadorRegistros }>) {
      this.loading = true
   }

  ngOnInit(): void {
    console.log('ngOnInit')
    $(".card").css('visibility', 'hidden');
    //$( ".card" ).fadeOut();

    this.listar() 
  }

  listar(){
    console.log('listar')
    this.peliculaService.ListarPeliculas()
      .subscribe(resp => this.onGetSuccess(resp), 
          error => console.error(error))
  }

  onGetSuccess(peliculas: Pelicula[]): void {
    console.log('onGetSuccess: ' + peliculas) 
    this.peliculas = peliculas;

    this.NotificarCantidadRegistros();

    this.loading = false
  }

  private NotificarCantidadRegistros() {
    let indicadorRegistros: IndicadorRegistros;

    indicadorRegistros = { Entidad: 'Estrenos', Cantidad: this.peliculas.length };

    this.store.dispatch(action.actionIndRegs({ indRegs: indicadorRegistros }));
  }

  ver(pelicula: Pelicula) {
    this.id = pelicula.peliculaId
    this.titulo = pelicula.titulo
    this.estreno = pelicula.estreno
    this.poster = pelicula.rutaPoster

    //$(".card").css('visibility', 'visible');
    $( ".card" ).fadeIn("slow");
  }

  borrar(peliculaId: number){
    console.log('borrar pelicula id: ' + peliculaId);
 
    this.peliculaService.EliminarPelicula(peliculaId).
      subscribe(resp => this.onBorradoExitoso(), 
        error => console.error(error)); 
  }

  onBorradoExitoso(): void {   
    $(".card").fadeOut( 1600, "linear", function() {

    });

    this.listar() 
  }

  editar(peliculaId: number){
    this.router.navigate(['/editar-pelicula/' + peliculaId])
  }
}
