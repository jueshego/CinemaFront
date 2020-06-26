import { on, createReducer } from '@ngrx/store'
import * as states from './store.actions'
import { IndicadorRegistros } from '../Interfaces/IndicadorRegistros'

export const initial = { Entidad: "", Cantidad: 0}

const _indRegsReducer = createReducer(
    initial,
    on(states.actionIndRegs, (state, { indRegs }) => indRegs )
)

export function indRegsReducer(state, action){
    return _indRegsReducer(state, action)
}