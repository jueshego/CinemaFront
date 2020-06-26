import { createAction, props } from '@ngrx/store'
import { IndicadorRegistros } from '../Interfaces/IndicadorRegistros'

export const actionIndRegs = createAction('ActionIndRegs',
    props<{ indRegs: IndicadorRegistros }>()
)
