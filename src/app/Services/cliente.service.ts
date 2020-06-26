import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import * as data from '../config.json'; 

import { Cliente } from '../Models/Cliente';
import { Observable } from 'rxjs';

@Injectable({
   providedIn: 'root' 
})
export class ClienteService {

    private baseUrl;

    constructor(private http: HttpClient) {
        this.baseUrl = data.apiUrl + 'cliente';
    }

    InsertarCliente(cliente: Cliente): Observable<number> {
        return this.http.post<number>(this.baseUrl, cliente);
    }

    ActualizarCliente(cliente: Cliente): Observable<number> {
        return this.http.put<number>(this.baseUrl  + '/' + cliente.clienteId, cliente);
    }

    ListarClientes(): Observable<Cliente[]> {
        return this.http.get<Cliente[]>(this.baseUrl);
    }

    EliminarCliente(id: number):Observable<any> {
        console.log('service eliminar: ' + id);
        return this.http.delete<void>(this.baseUrl + '/' + id); 
    }
}

