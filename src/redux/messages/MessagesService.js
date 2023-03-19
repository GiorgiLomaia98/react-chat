import axios from "axios";

const BACKEND_URL =  `https://fullstack-chat-app-backend-production.up.railway.app/api/messages`


export const isMessageSender = (messages, message, index, userId) => {
    return (
        index < messages.length - 1 &&
        (messages[index + 1]?.sender?._id !== message?.sender?._id ||
            messages[index + 1]?.sender?._id !== undefined) &&
        messages[index]?.sender?._id !== userId
    )
};

export const isLastMessage = (messages, i, userId) => {
  return (
    i === messages.length - 1 &&
    messages[messages.length - 1].sender._id !== userId &&
    messages[messages.length - 1].sender._id
  );
};



export const isSameSenderMargin = (messages, m, i, userId) => {
    // console.log(i === messages.length - 1);
  
    if (
      i < messages.length - 1 &&
      messages[i + 1].sender?._id === m?.sender?._id &&
      messages[i]?.sender?._id !== userId
    )
      return 33;
    else if (
      (i < messages.length - 1 &&
        messages[i + 1]?.sender?._id !== m?.sender?._id &&
        messages[i]?.sender?._id !== userId) ||
      (i === messages.length - 1 && messages[i]?.sender?._id !== userId)
    )
      return 0;
    else return "auto";
};

export const isSameUser = (messages, m, i) => {
    return i > 0 && messages[i - 1]?.sender?._id === m?.sender?._id;
  };





  export const sendMessage = (formdata) => {
    return async (dispatch) => {
      try {
        const response = await axios.post(`${BACKEND_URL}`, formdata);
        const data = response.data;
        dispatch({ type: 'SEND_MESSAGE_SUCCESS', payload: data });
        return data;
      } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        dispatch({ type: 'SEND_MESSAGE_FAILURE', payload: message });
        throw new Error(message);
      }
    };
  };
  

const getMessages = async (chatId) => {
    try {
        console.log("Attempting to send message...");
        const response = await axios.get(`${BACKEND_URL}/${chatId}`);
        // if (response.statusText === "OK") {
        // };
        return response.data
    } catch (error) {
        console.log("Attempting to send error...");
        const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
    
     console.log(message)
    }
}

const messageSevice = {
    getMessages
   
};

export default messageSevice
