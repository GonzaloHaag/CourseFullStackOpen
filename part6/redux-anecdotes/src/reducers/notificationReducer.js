import { createSlice } from '@reduxjs/toolkit';


const notificationSlice = createSlice({
    name:'notification',
    initialState:'',
    reducers : {
        createNotification (state,action) {
            return action.payload // me llegara la notificon a largar
        },
        clearNotification() {
            return ''
        }
    }
});

export const { createNotification, clearNotification } = notificationSlice.actions
// CHUNK para el timeout de las notificaciones
export const setNotificationWithTimeout = (message, seconds) => {
    return (dispatch) => {
      dispatch(createNotification(message));
      setTimeout(() => {
        dispatch(clearNotification());
      }, seconds * 1000);
    };
  };
export default notificationSlice.reducer