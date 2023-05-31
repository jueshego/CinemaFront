import { Pelicula } from './Pelicula'
import { Sala } from './Sala'

export class Funcion {
    funcionId: number
    salaId: string
    peliculaId: number
    fecha: Date 
    activa: boolean
    pelicula: Pelicula
    sala: Sala
}