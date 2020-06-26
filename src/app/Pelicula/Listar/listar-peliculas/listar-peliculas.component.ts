import { Component, OnInit } from '@angular/core';
import { PeliculaService } from 'src/app/Services/pelicula.service';
import { Pelicula } from '../../../Models/Pelicula'
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as $ from 'jquery'
import { IndicadorRegistros } from 'src/app/Interfaces/IndicadorRegistros';
import * as action from './../../../Reducers/store.actions'
 
@Component({
  selector: 'app-listar-peliculas',
  templateUrl: './listar-peliculas.component.html',
  styleUrls: ['./listar-peliculas.component.css']
})
export class ListarPeliculasComponent implements OnInit {

  peliculas: Pelicula[];
  loading: boolean 
  arrayCant: string
  indicadorRegistros: IndicadorRegistros

  constructor(private peliculaService: PeliculaService, private rutas: Router,
    private store: Store<{ storeIndRegs: IndicadorRegistros }>) {
      this.loading = true
     }

  ngOnInit(): void {
    this.listarPeliculas(); 
  }

  listarPeliculas() {
    console.log('peliculas listarPeliculas');
    this.peliculaService.ListarPeliculas().
        subscribe(resp => this.onGetPeliculas(resp),
                  error => console.error(error)); 
  }

  onGetPeliculas(peliculas: Pelicula[]): void {
    this.peliculas = peliculas

    this.NotificarCantidadRegistros()

    this.loading = false
  }

  private NotificarCantidadRegistros() {
    let indicadorRegistros: IndicadorRegistros;

    indicadorRegistros = { Entidad: 'Estrenos', Cantidad: this.peliculas.length };

    this.store.dispatch(action.actionIndRegs({ indRegs: indicadorRegistros }));
  }

  editar(peliculaId: number){
    this.rutas.navigate(['/editar-pelicula/' + peliculaId])
  }

  borrar(peliculaId: number, index: number){
    console.log('borrar pelicula id: ' + peliculaId);
 
    this.peliculaService.EliminarPelicula(peliculaId).
      subscribe(resp => this.onBorradoExitoso(index), 
        error => console.error(error)); 
  }

  onBorradoExitoso(index: number): void {
    var cardId = "#card_" + index
    console.log('cardId: ' + cardId)
    
    $(cardId).fadeOut( 1600, "linear", function() {
      // Animation complete.
    });

    this.listarPeliculas()
  }
}
