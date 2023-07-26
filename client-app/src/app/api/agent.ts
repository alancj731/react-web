import Axios, { AxiosResponse } from 'axios';
import { Activity } from '../models/activity';

// delay function
const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout( ()=> resolve("Time delayed") , delay);
    })
}

Axios.defaults.baseURL = "http://localhost:5000/api";

// add delay here
Axios.interceptors.response.use( async response => {
    try {
        await sleep(1000);
        console.log("response successfully delayed");
        return response;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
})

const responseBody = <T> (response: AxiosResponse<T>) => response.data;

const request = {
    get:<T> (url: string) => Axios.get<T>(url).then(responseBody),
    post:<T> (url: string, body: {}) => Axios.post<T>(url, body).then(responseBody),
    put:<T> (url: string, body: {}) => Axios.put<T>(url, body).then(responseBody),
    del:<T> (url: string) => Axios.delete<T>(url).then(responseBody),
}

const Activities =  {
    list: () => request.get<Activity[]>("/activities"),
    detail: (id: string) => request.get<Activity>(`/activities/${id}`),
    create: (activity: Activity) => request.post<void>("/activities", activity),
    update: (activity: Activity) => request.put<void>(`/activities/${activity.id}`, activity),
    delete: (id: string) => request.del<void>(`/activities/${id}`),
}

const agent = {
    Activities
}

export default agent;