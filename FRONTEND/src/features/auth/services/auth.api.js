import axios from 'axios';

export async function Register({ username, email, password }) {
    try {
        const response = await axios.post('http://localhost:3000/api/auth/register', {
            username, email, password
        }, {
            withCredentials: true
        })

        return response.data;

    } catch (error) {
        console.log(error);
    }
}


export async function Login({ email, password }) {
    try {
        const response = await axios.post('http://localhost:3000/api/auth/login', {
            email, password
        }, {
            withCredentials: true
        })
        
        return response.data
    } catch (error) {
        console.log(error)
    }
}