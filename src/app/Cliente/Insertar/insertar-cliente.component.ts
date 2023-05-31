import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ClienteService } from '../../Services/cliente.service'
import { Cliente } from 'src/app/Models/Cliente';
import { Store } from '@ngrx/store';
import { IndicadorRegistros } from 'src/app/Interfaces/IndicadorRegistros';
import * as action from './../../Reducers/store.actions'

@Component({
  selector: 'app-insertar-cliente',
  templateUrl: './insertar-cliente.component.html',
  styleUrls: ['./insertar-cliente.component.css']
}) 
export class InsertarClienteComponent implements OnInit {

  formInsertarCliente: FormGroup;
  selSexo: FormControl = new FormControl();
  clientes: Cliente[];
  editMode: boolean = false;
  guardando: boolean = false;
  loading: boolean 
  titulo: string
  mostrarAlerta: boolean = false
  classAlerta: string
  textoAlerta: string = ''

  constructor(private fromBuilder: FormBuilder, private clienteService: ClienteService,
    private store: Store<{ storeIndRegs: IndicadorRegistros }>) { }

  ngOnInit(): void {  
    this.Limpiar();

    this.ListarClientes();
  }

  guardar(formValue: any){
    this.guardando = true 
    const cliente = new Cliente();

    cliente.cedula = formValue.txtCedula; 
    cliente.nombre = formValue.txtNombre;
    cliente.activo = formValue.chkActivo;
    cliente.sexo = this.selSexo.value;

    if (this.editMode == true){
      console.log('guardar this.editMode true: ' + this.editMode);
      cliente.clienteId = formValue.txtId;

      this.clienteService.ActualizarCliente(cliente).
        subscribe(resp => this.GuardadoExitoso(resp), 
                error => this.errorGuardar(error)); 
    }else{
      console.log('guardar this.editMode false: ' + this.editMode);
      this.clienteService.InsertarCliente(cliente).
      subscribe(resp => this.GuardadoExitoso(resp), 
                error => this.errorGuardar(error)); 
    }   
  }

  errorGuardar(error: any){
    console.error(error) 
    console.log(error)
    this.alerta('Error: ' + error.message, 'alerta error')
  }

  GuardadoExitoso(resp: number): void {
    this.ListarClientes();

    this.Limpiar();
    this.guardando = false 
    this.alerta('Cliente guardado.', 'alerta success')
  }

  Limpiar() {
    this.titulo = 'Nuevo Cliente'
    this.formInsertarCliente = this.fromBuilder.group({
      txtId: [null],
      txtCedula: [null, [Validators.required]],
      txtNombre: [null, [Validators.required]],
      chkActivo: [true]
    });

    this.selSexo.markAsUntouched()
    this.selSexo.setValue('');
  }

  ListarClientes() {
    this.loading = true
    this.clienteService.ListarClientes().
      subscribe(resp => this.ConsultaExitosa(resp), error => console.error(error));
  }

  ConsultaExitosa(clientes: Cliente[]): void {
     this.clientes = clientes;

     this.loading = false

     console.log(this.clientes); 

     this.NotificarCantidadRegistros()
  }

    private NotificarCantidadRegistros() {
      let indicadorRegistros: IndicadorRegistros;
  
      indicadorRegistros = { Entidad: 'Clientes', Cantidad: this.clientes.length };
  
      this.store.dispatch(action.actionIndRegs({ indRegs: indicadorRegistros }));
    }

  editar(cliente: Cliente){
    this.titulo = 'Editar Cliente'
    this.formInsertarCliente.patchValue({
      txtId: cliente.clienteId,
      txtCedula: cliente.cedula,
      txtNombre: cliente.nombre,
      chkActivo: cliente.activo
    });

    this.selSexo.setValue(cliente.sexo);

    this.editMode = true;
  }

  alerta(mensaje: string, tipo: string){
    this.textoAlerta = mensaje
    this.mostrarAlerta = true
    this.classAlerta = tipo
  }
}
  