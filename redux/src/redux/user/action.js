import { Api } from "../../utils/api"
import { User } from "../../utils/validation";
import { z } from "zod";

export const loginUser = user => async dispatch => {
    try {
        const data = await Api.getUser(user.email, user.password);
        if (!data) {
            throw new Error("Такого пользователя нет")
        }
        dispatch({
            type: 'SET/USER/DATA',
            payload: data
        })
    } catch (error) {
        dispatch({
            type: 'SET/USER/ERROR',
            payload: error
        })
    }
}
export const signupUser = user => async dispatch => {
    try {
        const { confirmedPassword, ...newUser } = User.parse(user);
        const existedUser = await Api.getUser(newUser.email, newUser.password);
        if (existedUser) {
            throw new Error("Такой пользователь уже существует")
        }
        const data = await Api.postUser(newUser);
        dispatch({
            type: 'SET/USER/DATA',
            payload: data
        });
    } catch (error) {
        dispatch({
            type: 'SET/USER/ERROR',
            payload: error
        })
    }
}

