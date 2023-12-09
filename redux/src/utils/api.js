import axios from "axios"
const instance = axios.create({ baseURL: 'http://localhost:8000/' })

export class Api {
    static getNotes = async (params) => {
        try {
            const query = new URLSearchParams(params).toString();
            const { data } = await instance.get(`notes?${query}`)
            return data;
        } catch (error) {
            throw error
        }
    }
    static postNote = async (note) => {
        try {
            const { data } = await instance.post(`notes`, note);
            return data;
        } catch (error) {
            throw error
        }
    }
    static putNote = async (note) => {
        try {
            const { id, ...d } = note;
            const { data } = await instance.put(`notes/${id}`, d);
            return data;
        } catch (error) {
            throw error
        }
    }
    static getUser = async (email, password) => {
        try {
            const query = new URLSearchParams({ email, password }).toString();
            const { data } = await instance.get(`users?${query}`);
            return data[0]
        } catch (error) {
            throw error
        }
    }
    static postUser = async (user) => {
        try {
            const { data } = await instance.post(`users`, user);
            return data;
        } catch (error) {
            throw error;
        }
    }
    static deleteNotes = async (id) => {
        try {
            await instance.delete(`notes/${id}`)
        } catch (error) {
            throw error;
        }
    }
}