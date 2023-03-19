import axios from "axios";

const BACKEND_URL =  `https://fullstack-chat-app-backend-production.up.railway.app`


// export const getSender = (loggedUser, users) => {
//     const otherUser = users.find(user => user._id !== loggedUser._id);
//     return otherUser && otherUser.name;
//   };
export const getSender = (loggedInUserId, users) => {
    for (let i = 0; i < users?.length; i++) {
      const user = users[i];
      if (user._id !== loggedInUserId) {
        return user.name;
      }
    }
    return "";
};
  
export const getSenderFull = (loggedInUserId, users) => {
    return loggedInUserId._id === users[0]?._id ? users[1] : users[0]
  };

const accessChat = async (userId) => {
    try {
        const response = await axios.post(`${BACKEND_URL}/api/chats`,{userId});
        if (response.statusText === "OK") {
            console.log("User is chat is here");
        };
        return response.data
        
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        
        console.log(message)
        
    }
    
};

const getUserChats = async () => {
    try {
        const response = await axios.get(`${BACKEND_URL}/api/chats`);
        if (response.statusText === "OK") {
            console.log("User is chat is here")
            
        };
        return response.data
        
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        
        console.log(message)
        
    }
    
};

const createGroupChat = async (formData) => {
    try {
        const response = await axios.post(`${BACKEND_URL}/api/chats/group`,formData);
        if (response.statusText === "OK") {
            console.log("User is chat is here")
        };
        return response.data
        
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        
        console.log(message)
        
    }
}


const renameGroupChat = async (formData) => {
    try {
        const response = await axios.put(`${BACKEND_URL}/api/chats/renamegroup`,formData);
        if (response.statusText === "OK") {
            console.log("User is chat is here")
        };
        return response.data
        
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        
        console.log(message)
        
    }
}

const removeFromGroupChat = async (formData) => {
    try {
        const response = await axios.put(`${BACKEND_URL}/api/chats/remove-from-group`,formData);
        if (response.statusText === "OK") {
            console.log("User is chat is here")
        };
        return response.data
        
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        
        console.log(message)
        
    }
}

export const addToGroupChat = async (formData) => {
    try {
        const response = await axios.put(`${BACKEND_URL}/api/chats/add-to-group`,formData);
        if (response.statusText === "OK") {
            console.log("User is chat is here")
        };
        return response.data
        
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        
        console.log(message)
        
    }
}


const chatService = {
    accessChat,
    getUserChats,
    createGroupChat,
    renameGroupChat,
    removeFromGroupChat
   
};

export default chatService

