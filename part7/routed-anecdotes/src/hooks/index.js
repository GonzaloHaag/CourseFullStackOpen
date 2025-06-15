/** Crear tus propios Hooks 
 * te permite extraer la lógica de los componentes en funciones reutilizables. --> SUPER UTIL
Los hooks personalizados son funciones regulares de 
JavaScript que pueden utilizar cualquier otro hook, 
siempre que se adhieran a las reglas de los hooks. Además, el nombre de los hooks personalizados debe comenzar 
con la palabra use 
*/

import { useState } from "react"

export const useField = (type) => {
    const [ value, setValue ] = useState('');

    const onChange = (event) => {
        setValue( event.target.value );
    }
    const resetValue = () => {
        setValue('');
    }
    return {
        /** Valores a retornar, separados del reset para poder hacer el spread {...} */
        inputsProps : {
            type, // el tipo del input, text, number...
            value,
            onChange
        },
    resetValue // retorno la funcion
    }
}