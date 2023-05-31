import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery'

@Component({
  selector: 'app-sillas',
  templateUrl: './sillas.component.html',
  styleUrls: ['./sillas.component.css']
})
export class SillasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {  
  }

  getSillaEstado(silla : any){
    var sillaId = $(silla).attr('id');

    console.log('getSillaEstado()', sillaId) 
  }
}
