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
  pelicula: Pelicula
  filtro: ''
  pageActual: number = 1 
  loading: boolean

  constructor(private peliculaService: PeliculaService, private router: Router,
    private store: Store<{ storeIndRegs: IndicadorRegistros }>) {
      this.loading = true
   }

  ngOnInit(): void {
    console.log('ngOnInit')
    //$("#cardPelicula").css('visibility', 'hidden');
    //$( "#cardPelicula" ).fadeOut();

    this.listar()  
  }

  listar(){
    $( "#cardPelicula" ).fadeOut( "slow");
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
    this.pelicula = pelicula
    
    //$("#cardPelicula").css('visibility', 'visible');
    $( "#cardPelicula" ).fadeIn("slow");
  }
}
