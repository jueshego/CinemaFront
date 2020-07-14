import { Component, OnInit } from '@angular/core';
import * as data from './../../sedes.json'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Sala } from 'src/app/Models/Sala';

@Component({
  selector: 'app-insertar-sala',
  templateUrl: './insertar-sala.component.html',
  styleUrls: ['./insertar-sala.component.css']
})
export class InsertarSalaComponent implements OnInit {

  sedes: string[]
  formSala: FormGroup

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.sedes = data.sedes 
    console.log("this.sedes", this.sedes)
    this.limpiar()
  } 

  limpiar() {
    this.formSala = this.formBuilder.group({
      selSede: ["", Validators.required],
      txtCodigo: [null, Validators.required],
      txtCapacidad: [null, [Validators.required, Validators.pattern('[1-9]+[0-9]*$')]]  
    })
  }
 
  guardar(formvalue: any) {
     console.log("guardar", formvalue)
     
     sala: Sala
     let sala = new Sala()
     
     sala.sede = formvalue.selSede
     sala.codigo = formvalue.txtCodigo
     sala.capacidad = formvalue.txtCapacidad

     console.log("sala", sala)
     
  }
}
