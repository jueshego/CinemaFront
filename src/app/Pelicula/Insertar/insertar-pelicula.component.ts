import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
import { Pelicula } from '../../Models/Pelicula'
import { PeliculaService } from '../../Services/pelicula.service'
import { Router, ActivatedRoute } from '@angular/router'
import { DatePipe } from '@angular/common';
import * as $ from 'jquery'

@Component({
  selector: 'app-insertar-pelicula',
  templateUrl: './insertar-pelicula.component.html',
  styleUrls: ['./insertar-pelicula.component.css']
})

export class InsertarPeliculaComponent implements OnInit {

  model: Pelicula = { peliculaId: 0, titulo: '', estreno: new Date(), rutaPoster: ''};

  editMode: boolean = false;
  title: string;
  alerta: boolean = false;
  guardando: boolean = false;
  borrando: boolean = false;

  /*
  peliculaId: number;
  titulo: string;
  estreno: string;
  rutaPoster: string;
  */

  constructor(private peliculaService: PeliculaService, private rutas: Router,
    private activatedRoute: ActivatedRoute, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params =>{
        var id = params["peliculaId"];

        console.log('this.titulo:' + this.title);
        if(id == undefined){
          this.nueva();
          return;
        }

        this.title = "Editar Pelicula"
        this.editMode = true;

        this.peliculaService.ObtenerPelicula(id).
          subscribe(resp => this.ObtenerPelicula(resp), 
                    error => console.error(error));
    });
  }

  inicializar() {
    console.log('inicializar');  

    let myDate = this.datePipe.transform('2020-01-01', 'yyyy-MM-dd')
      .replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"); 

    this.model = { peliculaId: 0, titulo: '', estreno: new Date(myDate), rutaPoster: ''};
  }  

  ObtenerPelicula(pelicula: Pelicula) {
    let myDate = this.datePipe.transform(pelicula.estreno, 'yyyy-MM-dd')
      .replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3");
      
    //let newDate = this.datePipe.transform(myDate, 'dd/MM/yyyy', 'UTC');

    console.log('estreno:' + myDate);

    this.model = { peliculaId: pelicula.peliculaId, 
      titulo: pelicula.titulo, 
      estreno: new Date(myDate), 
      rutaPoster: pelicula.rutaPoster };
  }

  Guardar(formPelicula: NgForm){
    this.guardando = true
    
    console.log(this.model.titulo);
    console.log(this.model.estreno);
    console.log(this.model.rutaPoster); 

    if (formPelicula.form.pristine || this.model.estreno <= new Date(1900,1,1)){
      console.log('form invalido'); 
      return; 
    }
 
    if(this.editMode){
      this.peliculaService.ActualizarPelicula(this.model)
        .subscribe(resp => this.GuardadoExitoso(resp as Pelicula), 
                 error => console.error(error))
    }else{
      this.peliculaService.InsertarPelicula(this.model)
        .subscribe(resp => this.GuardadoExitoso(resp as Pelicula), 
                 error => console.error(error))
    }
  } 

  GuardadoExitoso(pelicula: Pelicula): void {
    console.log('pelicula id: ' + pelicula.peliculaId);

    this.rutas.navigate(['/listar-peliculas']) 
  }

  borrar(id: number){
    this.borrando = true

    console.log('borrar pelicula id: ' + id);

    this.peliculaService.EliminarPelicula(id).
      subscribe(resp => this.borradoExitoso(),  
        error => console.error(error));
  }

  borradoExitoso(){
    this.alerta = true;
    this.nueva();
  }

  nueva(){
    this.inicializar();
    this.title = "Nueva Pelicula"
    this.editMode = false;
  }
  
}
