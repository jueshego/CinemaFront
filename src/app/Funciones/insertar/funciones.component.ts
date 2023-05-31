import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { error } from '@angular/compiler/src/util';
import { ListarFuncionesComponent } from '../listar/listar-funciones.component';
import { Pelicula } from 'src/app/Models/Pelicula';
import { Sala } from 'src/app/Models/Sala';
import { Funcion } from 'src/app/Models/Funcion';
import { FuncionService } from 'src/app/Services/funcionService';
import { PeliculaService } from 'src/app/Services/pelicula.service';
import { SalaService } from 'src/app/Services/sala.Service';

@Component({
  selector: 'app-funciones',
  templateUrl: './funciones.component.html',
  styleUrls: ['./funciones.component.css']
})
export class FuncionesComponent implements OnInit {

  peliculas: Pelicula[]
  salas: Sala[]
  model: Funcion = { funcionId: 0, salaId: "", peliculaId: 0, fecha: new Date(), activa: true, pelicula: null, sala: null};
  title: String
  editMode: boolean
  mostrarAlerta: boolean
  alerta: string
  classAlert: string
  estreno: Date
  sede: string
  guardando: boolean
  today: string

  @ViewChild(ListarFuncionesComponent) listadoComponent: ListarFuncionesComponent

  constructor(private funcionService: FuncionService, private peliculaService: PeliculaService, private salaService: SalaService, private datePipe: DatePipe) { }

  ngOnInit(): void { 
    this.today = this.datePipe.transform(new Date(), 'yyyy-MM-dd')
    .replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3");  

    console.log('estreno',this.estreno)
    this.peliculaService.ListarPeliculas()
      .subscribe(resp => this.peliculas = resp,
                error => this.onError(error))

    this.salaService.consultarSalas()
      .subscribe(resp => this.salas = resp,
                error => this.onError(error)) 
    this.limpiar()
  }
  
  
 
  limpiar(){
    this.guardando = false
    this.title = 'Nueva Funcion'   
    this.editMode = false
    /*
    let myDate = this.datePipe.transform('2020-01-01', 'yyyy-MM-dd')
      .replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3");  
    */
    this.model = { funcionId: 0, salaId: "", peliculaId: 0, fecha: new Date(this.today), activa: true, pelicula: null, sala: null};
  } 

  seleccionSala(codigo: string){ 
    this.sede = this.salas.find(item => item.codigo === codigo).sede
  }

  seleccionPelicula(peliculaId: number){ 
    console.log('seleccionPelicula peliculaId', peliculaId)

    this.estreno = this.peliculas.find(item => item.peliculaId.toString() === peliculaId.toString()).estreno
  }

  onError(error: any){
    this.alerta = error.message
    this.classAlert = "alerta error"
    this.mostrarAlerta = true
    this.guardando = false 
  }

  guardar(formFuncion: NgForm){
    this.mostrarAlerta = false
    this.guardando = true

    console.log('this.model.fecha', this.model.fecha.toString())
    console.log('today', this.today) 

    
    if (this.model.fecha.toString() <= this.today){
      const error = new Error()
      error.message = 'Fecha invalida.'
      this.onError(error)
      console.log('fecha invalida', this.model.fecha)
      return;  
    }
    
    this.funcionService.InsertarFuncion(this.model)
      .subscribe(resp=> this.guardadoExitoso(), error => this.onError(error))
 
  }

  guardadoExitoso(): void {
    this.alerta = 'funcion guardada'
    this.classAlert = "alerta success"
    this.mostrarAlerta = true
    this.guardando = false 
    this.listadoComponent.Listar();
  }

}
