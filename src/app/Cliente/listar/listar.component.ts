import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ClienteService } from '../../Services/cliente.service'
import { Cliente } from '../../Models/Cliente'
import { IndicadorRegistros } from 'src/app/Interfaces/IndicadorRegistros';
import { Store } from '@ngrx/store';
import * as action from './../../Reducers/store.actions'

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {

  @Input('listadoClientes') clientes: Cliente[];
  @Output() eventEditar = new EventEmitter<Cliente>();

  constructor(private clienteService: ClienteService,
    private store: Store<{ storeIndRegs: IndicadorRegistros }>) { }

  ngOnInit(): void {
  }

  editar(cliente: Cliente){
    this.eventEditar.emit(cliente);
  }

  borrar(id: number){
    console.log('eliminar: ' + id);
    this.clienteService.EliminarCliente(id)
      .subscribe(resp => this.borrarListarClientes(), error => console.error(error));
  }

  borrarListarClientes() {
    console.log('ListarClientes')
    this.clienteService.ListarClientes().
      subscribe(resp => this.ConsultaExitosa(resp), error => console.error(error));
  }

  ConsultaExitosa(clientes: Cliente[]): void {
     this.clientes = clientes;

     this.NotificarCantidadRegistros()
  }

  private NotificarCantidadRegistros() {
    let indicadorRegistros: IndicadorRegistros;

    indicadorRegistros = { Entidad: 'Clientes', Cantidad: this.clientes.length };

    this.store.dispatch(action.actionIndRegs({ indRegs: indicadorRegistros }));
  }
}
