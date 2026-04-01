import axios from 'axios';

// created an instance of the axios
const api = axios.create({
    baseURL : "http://localhost:3000",
    withCredentials : true  // the api interacts with the cookies that's why we add 
})

export async function Register({ username, email, password }) {
    try {
        const response = await api.post('/api/auth/register', {
            username, email, password
        })

        return response.data;
    } catch (error) {
        console.log("Error from Register",error.message);
    }
}

export async function Login({ email, password }) {
    try {
        const response = await api.post('/api/auth/login', {
            email, password
        })

        return response.data
    } catch (error) {
        console.log("Error from login",error.message)
    }
}

export async function Logout(){
    try{
        const response = await api.get('/api/auth/logout')

        return response.data;
    }catch(error){
        console.log("Error from logout",error.message);
    }
}

export async function Getme(){
    try {
        const response = await api.get('/api/auth/get-me')

        return response.data;
    } catch (error) {
        console.log("Error from get-me",error.message);
    }
}