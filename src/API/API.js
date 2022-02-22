import axios from 'axios';
import {reactLocalStorage} from 'reactjs-localstorage';
const API = () => {
   
    // Create instance
    const instance = axios.create({
        baseURL: 'https://api-placeholder.herokuapp.com/'
    })
    
    // console.log(instance);
    // Set the AUTH token for any request 
    instance.interceptors.request.use(function (config){
        const token = reactLocalStorage.get("TOKEN");

        config.headers.Authorization = token ? `Bearer ${token}` : '';
        config.headers.Accept = 'application/json';
        return config;
    });

    // handle error
    instance.interceptors.request.use((response) => response, error =>{
        // if status 401 unauthenticate, remove session and redirect to login page
        if(error.response.status === 401){
            reactLocalStorage.clear();
            window.location.href = `${window.location.origin}\login`;
        }else{
            throw error; // whatever you want to do with the error
        }
    });
    return instance;

};
export default API();