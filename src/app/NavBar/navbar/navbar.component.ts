import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { IndicadorRegistros } from 'src/app/Interfaces/IndicadorRegistros';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  obsIndicadorRegistros$: Observable<any>
  labelEntidad: string
  cantidad: number

  constructor(private store: Store<{ storeIndRegs: IndicadorRegistros }>) { }

  ngOnInit(): void {
    this.obsIndicadorRegistros$ = this.store.select('storeIndRegs')
/*
    this.labelEntidad = this.obsIndicadorRegistros$._subscribe(resp =)
    this.cantidad = this.obsIndicadorRegistros$
*/
    this.obsIndicadorRegistros$
      .subscribe(resp => console.log('resp.entidad: ' +resp.Cantidad), 
                 error => console.error(error))

    this.obsIndicadorRegistros$
      .subscribe(resp => this.onGetIndicadorRegs(resp as IndicadorRegistros), 
                 error => console.error(error)
      )
  }

  onGetIndicadorRegs(indicadorRegistros: IndicadorRegistros): void {
    console.log('onGetIndicadorRegs cant: ' + indicadorRegistros)

    this.labelEntidad = indicadorRegistros.Entidad
    this.cantidad = indicadorRegistros.Cantidad
  }

}
