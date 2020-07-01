import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter  } from '@angular/core';
import { Pelicula } from 'src/app/Models/Pelicula';
import { PeliculaService } from 'src/app/Services/pelicula.service';
import * as $ from 'jquery'
import { Router } from '@angular/router'
import { noUndefined } from '@angular/compiler/src/util';
import { isUndefined, isNull } from 'util';

@Component({
  selector: 'app-card-pelicula',
  templateUrl: './card-pelicula.component.html',
  styleUrls: ['./card-pelicula.component.css']
})
export class CardPeliculaComponent implements OnInit {

  @Input('pelicula') pelicula: Pelicula
  @Output() eventListar = new EventEmitter();
  
  peliculaId: number = 0
  titulo: string = ''
  estreno: Date = new Date()
  poster: string = ''

  constructor(private peliculaService: PeliculaService, private router: Router) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('card changes', changes)

    if (this.pelicula !== null && noUndefined(this.pelicula)) {
      console.log('card pelicula id:',this.pelicula)
      this.peliculaId = this.pelicula.peliculaId
      this.titulo = this.pelicula.titulo
      this.estreno = this.pelicula.estreno
      this.poster = this.pelicula.rutaPoster

      //$(".card").css('visibility', 'visible');
      //$( ".card" ).fadeIn("slow");
    }
  }

  borrar(peliculaId: number){
    console.log('borrar pelicula id: ' + peliculaId);
 
    this.peliculaService.EliminarPelicula(peliculaId).
      subscribe(resp => this.onBorradoExitoso(),  
        error => console.error(error)); 
  }

  onBorradoExitoso(): void {   
    //$( "#card_1" ).fadeOut("slow");
    this.eventListar.emit(true)
  }

  editar(peliculaId: number){
    this.router.navigate(['/editar-pelicula/' + peliculaId])
  }

}
