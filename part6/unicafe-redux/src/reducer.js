const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

/** Los reducers deben ser funciones puras 
 * Las funciones puras son aquellas que no causan ningún efecto secundario y 
 * siempre deben devolver la misma respuesta cuando se llaman con los mismos parámetros
 */
const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      return { ...state, good: state.good + 1 } // retorno el estado original, y el good incrementado en 1
    case 'OK':
      return { ...state, ok: state.ok + 1 }
    case 'BAD':
      return { ...state, bad: state.bad + 1 }
    case 'ZERO':
      return { good:0, ok:0, bad:0 }
    default: return state
  }
  
}

export default counterReducer
