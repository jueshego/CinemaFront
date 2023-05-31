import { Component, OnInit } from '@angular/core';
import * as data from './../../sedes.json'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Sala } from 'src/app/Models/Sala';
import { SalaService } from 'src/app/Services/sala.Service';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-insertar-sala',
  templateUrl: './insertar-sala.component.html',
  styleUrls: ['./insertar-sala.component.css']
})
export class InsertarSalaComponent implements OnInit {

  sedes: string[]
  formSala: FormGroup
  guardando: boolean = false
  notifcarNuevoEditar: number = 0
  editMode: boolean = false
  listaSalas: Sala[]
  alerta: string
  classAlert: string
  title: string
  mostrarAlerta: boolean = false

  constructor(private formBuilder: FormBuilder, private salaService: SalaService) { }

  ngOnInit(): void {
    this.sedes = data.sedes 
    //console.log("this.sedes", this.sedes)
    this.limpiar() 
  } 

  limpiar() {
    this.title = 'Nueva Sala'
    this.editMode = false
    //console.log('insertar sala limpiar editMode', this.editMode)

    this.formSala = this.formBuilder.group({
      selSede: ["", Validators.required],
      txtCodigo: [null, Validators.required],
      txtCapacidad: [null, [Validators.required, Validators.pattern('[1-9]+[0-9]*$')]]  
    })
  }

  editar(sala: Sala){ 
    this.title = 'Editar Sala'
    this.mostrarAlerta = false
    this.formSala.patchValue({
      selSede: sala.sede,
      txtCodigo: sala.codigo,
      txtCapacidad: sala.capacidad
    })

    this.editMode = true

    //console.log('insertar sala editar editMode', this.editMode)

    this.formSala.get('selSede').disable()
    this.formSala.get('txtCodigo').disable()
  }
 
  guardar(formvalue: any) {
     this.guardando = true
     
     sala: Sala
     let sala = new Sala()

     sala.capacidad = formvalue.txtCapacidad

     if(this.editMode){
        sala.sede = this.formSala.get('selSede').value
        sala.codigo = this.formSala.get('txtCodigo').value

        //console.log('sala', sala)

        this.formSala.get('selSede').enable()
        this.formSala.get('txtCodigo').enable()

        this.salaService.actualizarSala(sala)
          .subscribe(resp => this.guardadoExitoso(resp),
                     error => this.onError(error)
          ) 
     }

     sala.sede = formvalue.selSede 
     sala.codigo = formvalue.txtCodigo

     if (this.validarCodigo(sala.codigo) == false){
       this.guardando = false
       return
     }

     this.salaService.insertarSala(sala)
      .subscribe(resp => this.guardadoExitoso(resp)) 
  }

  onError(error: any): void {
    this.alerta = error.message
    this.classAlert = "alerta error"
    this.mostrarAlerta = true
  }

  validarCodigo(codigo: string): boolean {
    const resultado = this.listaSalas.find(sala => sala.codigo === codigo)

    //console.log('validarCodigo resultado:', resultado)

    if (isNullOrUndefined(resultado)){
      return true
    }

    this.alerta = "El codigo " + codigo + ' ya existe.'
    this.classAlert = "alerta error"
    this.mostrarAlerta = true

    return false
  }

  guardadoExitoso(sala: Sala): void {
    console.log('guardadoExitoso codio')
    this.guardando = false

    this.notifcarNuevoEditar++

    this.alerta = 'Sala guardada.'
    this.classAlert = "alerta success"
    this.mostrarAlerta = true

    this.limpiar()
  }

  consultarSalas(salas: Sala[]){
    this.limpiar() 
    this.listaSalas = salas
  }
}
