import { HttpClient } from '@angular/common/http';
import * as data from '../config.json'; 
import { Funcion } from '../Models/Funcion';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: "root"
})
export class FuncionService{
    private baseUrl;

    constructor(private http: HttpClient) {
        this.baseUrl = data.apiUrl + 'funcion';
    }

    InsertarFuncion(funcion: Funcion): Observable<number> {
        return this.http.post<number>(this.baseUrl, funcion);
    }

    ListarFunciones(): Observable<Funcion[]> {
        return this.http.get<Funcion[]>(this.baseUrl);
    }
}