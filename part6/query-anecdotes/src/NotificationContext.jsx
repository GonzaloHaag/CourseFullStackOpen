import { useReducer } from "react";
import { createContext } from "react";
import PropsTypes from 'prop-types'

const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.payload // Llegará el string a mostrar, lo retorno, esto ya reemplaza al state

        case 'CLEAR_NOTIFICATION':
            return ''
        default:
            return state
    }
}

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, ''); // Estado inicial vacio
    return (
        <NotificationContext.Provider value={[
            notification,
            notificationDispatch
        ]}>
            {props.children}
        </NotificationContext.Provider>
    )
}
NotificationContextProvider.propTypes = {
   children: PropsTypes.node.isRequired
}

export default NotificationContext;