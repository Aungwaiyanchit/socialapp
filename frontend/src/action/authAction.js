import { LOGIN } from "../constants/authConstants"
import * as api from '../services/authService'

export const login = (formData, router) => async (dispatch) => {
    try {
        const { data } = await api.login(formData)
        console.log(data);
        dispatch({ type: LOGIN, data })
        router('/')
    } catch (error) {
        console.log(error);
    }
}