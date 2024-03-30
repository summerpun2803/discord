import axios from 'axios';

const apiClient = axios.create({
    baseURL : 'http://localhost:5000/api',
    timeout:1000,
    withCredentials : true,
});

export const login = async(data) => {
    try{
        return await apiClient.post("/auth/login" , data);
    }catch(exception){
        return{
            error:true,
            exception,
        };
    }
};

export const register = async(data) => {
    try{
        return await apiClient.post("/auth/register" , data);
    }catch(exception){
        return{
            error:true,
            exception,
        };
    }
};

export const test = async() => {
    try{
        return await apiClient.get('/testing/test');
    }catch(exception){
        return{
            error:true,
            exception,
        };
    }
}

export const invite = async(data) => {
    try{
        console.log("data",data);
        return await apiClient.post("/friend/invite" , data);
    }catch(exception){
        return{
            error:true,
            exception,
        };
    }
}

export const accept = async(data) => {
    try{
        return await apiClient.post("/friend/accept" , data);
    }catch(exception){
        return{
            error:true,
            exception,
        }
    }
}

export const reject = async(data) => {
    try{
        return await apiClient.post("/friend/reject" , data);
    }catch(exception){
        return{
            error:true,
            exception,
        }
    }
}