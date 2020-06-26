import { HttpClient, HttpClientModule } from '@angular/common/http'
import * as data from '../config.json'; 
import { Pelicula } from '../Models/Pelicula'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

@Injectable({
    providedIn: "root"
})
export class PeliculaService{

    private baseUrl;

    constructor(private clienteHttp: HttpClient){
        this.baseUrl = data.apiUrl + 'Pelicula';
    }

    InsertarPelicula(pelicula: Pelicula): Observable<Pelicula>{
        return this.clienteHttp.post<Pelicula>(this.baseUrl, pelicula);
    }

    /*ActualizarPelicula(pelicula: Pelicula): Observable<Pelicula> {
        return this.clienteHttp.put<Pelicula>(this.baseUrl  + '/' + pelicula.peliculaId, pelicula);
    }*/

    ActualizarPelicula(pelicula: Pelicula): Observable<Pelicula> {
        return this.clienteHttp.put<Pelicula>(this.baseUrl, pelicula);
    }

    ListarPeliculas(): Observable<Pelicula[]> {
        console.log('PeliculaService ListarPeliculas');
        return this.clienteHttp.get<Pelicula[]>(this.baseUrl);
    }

    ObtenerPelicula(peliculaId: number): Observable<Pelicula> {
        return this.clienteHttp.get<Pelicula>(this.baseUrl  + '/' + peliculaId)
    }

    EliminarPelicula(id: number):Observable<any> {
        return this.clienteHttp.delete<void>(this.baseUrl + '/' + id); 
    }

}