
import axios from "axios";
import {toast} from "react-toastify"




// const reactToast = () => {
//     const toast = useToast();
// }


const BACKEND_URL =  `https://fullstack-chat-app-backend-production.up.railway.app`

export const validateEmail = (email) => {
    return email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
}

export const registerUser = async (userData) => {
    
   

    try {
        const response = await axios.post(`${BACKEND_URL}/api/users/register`, userData);
        if (response.statusText === "OK") {
           return toast.success("register successfull please log in");
            
        };
        return response.data
        
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        toast.error(message);
        return
        
   
    }

    
};

export const loginUser = async (userData) => {
    try {
        const response = await axios.post(`${BACKEND_URL}/api/users/login`, userData);
        if (response.statusText === "OK") {
            console.log("smt")
        };
        return response.data
        
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
            toast.error(message);
        
    }

};

export const getLoggedInStatus = async () => {
    try {
        const response = await axios.get(`${BACKEND_URL}/api/users/loggedin`);
        if (response.statusText === "OK") {
            console.log("smt")
        };
        return response.data
        
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
            toast.error(message);
        
      
        
    }

};

const getLoggedInUser = async () => {
    try {
        const response = await axios.get(`${BACKEND_URL}/api/users/getuser`);
        // if (response.statusText === "OK") {
            
        // };
        return response.data
        
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
            toast.error(message);
        
        console.log(message)
        
    }

};

export const logOutUser = async () => {
    try {
       await axios.get(`${BACKEND_URL}/api/users/logout`);   
        
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();  
            toast.error(message);
        console.log(message)      
    }

};

export const serachUser = async (param) => {
    try {
        const response = await axios.get(`${BACKEND_URL}/api/users?search=${param}`);
        if (response.statusText === "OK") {
            console.log(response.data, "search is good")
        };
        return response.data
        
    } catch (error) {
        const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
            error.toString(); 
            toast.error(message);
    console.log(message)  
        
    }
}



const authService = {
    getLoggedInUser
   
};

export default authService

