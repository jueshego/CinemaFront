import { HttpClient } from '@angular/common/http';
import * as data from './../config.json'
import { Sala } from '../Models/Sala';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: "root"
})
export class SalaService{

    private baseUrl

    constructor(private httpClient: HttpClient){
        this.baseUrl = data.apiUrl + 'Sala'  
    }

    insertarSala(sala: Sala): Observable<Sala> {
        console.log('salaservice', this.baseUrl)
        return this.httpClient.post<Sala>(this.baseUrl, sala)
    }

    consultarSalas(): Observable<Sala[]> {
        return this.httpClient.get<Sala[]>(this.baseUrl)
    }

    actualizarSala(sala: Sala): Observable<Sala> {
        return this.httpClient.put<Sala>(this.baseUrl, sala)
    }

    borrarSala(codigo: string): Observable<any> {
        return this.httpClient.delete<number>(this.baseUrl + "/" + codigo)
    }
}