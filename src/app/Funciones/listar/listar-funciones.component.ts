import { Component, OnInit } from '@angular/core';
import { onErrorResumeNext } from 'rxjs';
import { Funcion } from 'src/app/Models/Funcion';
import { FuncionService } from 'src/app/Services/funcionService';

@Component({
  selector: 'app-listar-funciones',
  templateUrl: './listar-funciones.component.html',
  styleUrls: ['./listar-funciones.component.css']
})
export class ListarFuncionesComponent implements OnInit { 

  pageActual: number = 1 
  funcionesFiltro: Funcion[]
  funcionesTodas: Funcion[]
  loading: boolean
  error: boolean
  mensajeError: String
  alerta: string
  classAlert: string
  mostrarAlerta: boolean = false
  sedes: string[]
  filtroSede: string = ''
  filtroCodigo: string = ''
  orden: string = 'ASC' 

  constructor(private funcionService: FuncionService) { }

  ngOnInit(): void {
    console.log('listar funciones ngOnInit')
    this.Listar();
  } 

  Listar(){
    this.funcionService.ListarFunciones()
      .subscribe(resp => this.onListar(resp),
                 error => this.onError(error)
      )
  }

  onError(error: any): void {
    throw new Error('Method not implemented.');
  }

  onListar(listaFunciones: Funcion[]): void {
    console.log('listaFunciones', listaFunciones)
    console.log('listaFunciones', listaFunciones[0].pelicula.titulo)
    this.funcionesTodas = listaFunciones
  }

  editar(funcion: Funcion){
    //this.eventEditar.emit(sala)
  }

  borrar(codigo: string){
    //this.alertaModal(codigo)
  }

  ordenar(columna: string){/*
    switch(columna){
      case "capacidad":{
        if(this.orden == 'ASC'){
          console.log('ordenar por capacidad ASC')
          this.salas.sort((a,b) => a.capacidad - b.capacidad)
          this.orden = 'DESC'
        } else {
          console.log('ordenar por capacidad DESC')
          this.salas.sort((a,b) => b.capacidad - a.capacidad)
          this.orden = 'ASC'
        }
        break
      }
      case "codigo":{
        if(this.orden == 'ASC'){
          console.log('ordenar por codigo ASC')
          this.salas.sort((a,b) => a.codigo.localeCompare(b.codigo))
          this.orden = 'DESC'
        } else {
          console.log('ordenar por codigo DESC')
          this.salas.sort((a,b) => b.codigo.localeCompare(a.codigo))
          this.orden = 'ASC'
        }
        break
      }
      case "sede":{
        if(this.orden == 'ASC'){
          console.log('ordenar por sede ASC')
          this.salas.sort((a,b) => a.sede.localeCompare(b.sede))
          this.orden = 'DESC'
        } else {
          console.log('ordenar por sede DESC')
          this.salas.sort((a,b) => b.sede.localeCompare(a.sede))
          this.orden = 'ASC'
        }
        break
      }
      default: {
        this.salas = this.salasSinFilro
        break
      }

    }*/
  }
}
