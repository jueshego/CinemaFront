import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Sala } from 'src/app/Models/Sala';
import { SalaService } from 'src/app/Services/sala.Service';
import * as $ from 'jquery'
import { isNullOrUndefined } from 'util';
import Swal from 'sweetalert2'
import * as data from './../../sedes.json'
import { stringify } from 'querystring';
import { Store } from '@ngrx/store';
import { IndicadorRegistros } from 'src/app/Interfaces/IndicadorRegistros';
import * as action from '../../Reducers/store.actions'

@Component({
  selector: 'app-listado-salas',
  templateUrl: './listado-salas.component.html',
  styleUrls: ['./listado-salas.component.css']
})
export class ListadoSalasComponent implements OnInit {

  @Input('consultar') consultar: number
  @Output() eventEditar = new EventEmitter()
  @Output() listaSalas = new EventEmitter()
  pageActual: number = 1 
  salas: Sala[]
  salasSinFilro: Sala[]
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

  constructor(private salaService: SalaService, private store: Store<{ storeIndRegs: IndicadorRegistros }>) {
    this.sedes = data.sedes 
   }

  ngOnInit(): void {
    this.consultarLista()
  }

  ngOnChanges(changes: SimpleChanges){
    console.log('listado-salas ngOnChanges', changes.consultar.currentValue)
    //if (changes.consultar.currentValue === true){
      this.consultarLista()
      this.mostrarAlerta = false
    //}
  }

  consultarLista(){
    this.loading = true

    this.salaService.consultarSalas()
      .subscribe(resp => this.consultaExitosa(resp), 
                 error =>this.onError(error)
                )
  }

  filtrar() {
    if(this.filtroCodigo !== '' || this.filtroSede !== ''){
      if(this.filtroCodigo !== ''){
        console.log('this.filtroCodigo',this.filtroCodigo)
        this.salas = this.salas.filter(item => item.codigo == this.filtroCodigo)
        console.log('salas',this.salas)
      } else {
        console.log('this.filtroSede',this.filtroSede)
        this.salas = this.salas.filter(item => item.sede == this.filtroSede)
        console.log('salas',this.salas) 
      }
    } else {
      this.salas = this.salasSinFilro
      console.log('this.salas',this.salas)
    }

    this.NotificarCantidadRegistros()
  }

  onError(error: any): void {
    console.log('onError', error)
    console.error(error)
    this.loading = false
    this.error = true
    this.mensajeError = error.message

    this.mostrarAlerta = true
    this.alerta = error.message
    this.classAlert = "alerta error"
  }

  consultaExitosa(salas: Sala[]): void {
    console.log('consultaExitosa')
    this.salas = salas
    this.salasSinFilro = salas
    console.log('salas', salas) 

    this.loading = false
    this.error = false

    this.listaSalas.emit(this.salas)

    this.NotificarCantidadRegistros()
  }
 
  editar(sala: Sala){
    this.eventEditar.emit(sala)
  }

  borrar(codigo: string){
    this.alertaModal(codigo)
  }

  borradoExitoso(resp: any): void {
    if (!isNullOrUndefined(resp)) {
      console.log('resp',resp)
      this.consultarLista()
      //$('#dataRow_' + resp).fadeOut( "slow")
      this.listaSalas.emit(this.salas)

      this.mostrarAlerta = true
      this.alerta = 'Sala borrada.'
      this.classAlert = "alerta success"
    }
  }

  private NotificarCantidadRegistros() {
    let indicadorRegistros: IndicadorRegistros;

    indicadorRegistros = { Entidad: 'Salas', Cantidad: this.salas.length };

    this.store.dispatch(action.actionIndRegs({ indRegs: indicadorRegistros }));
  }

  ordenar(columna: string){
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

    }
  }

  alertaModal(codigo: string){
    Swal.fire({
      title: 'Eliminar esta sala?',
      text: "Esta accion no se puede deshacer",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => { 
      if (result.value) {
        this.salaService.borrarSala(codigo)
          .subscribe(resp=> this.borradoExitoso(resp),
                    error =>this.onError(error)
        )

        Swal.fire(
          'Deleted!',
          'La sala ha sido borrada.',
          'success'
        )
      }
    })
  }
}
