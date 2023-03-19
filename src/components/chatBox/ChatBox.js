import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/authSlice';
import { selectSelectedChat } from '../../redux/chat/chatSlice';
import { Box } from "@chakra-ui/layout";
import SingleChat from '../singleChat/SingleChat';
import ProfileModal from "../modal/ProfileModal"





const ChatBox = () => {
  
  const selectedChat = useSelector(selectSelectedChat);
  return (
    <Box
    display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
    alignItems="center"
    flexDir="column"
    p={3}
    bg="white"
    w={{ base: "100%", md: "68%" }}
    borderRadius="lg"
    borderWidth="1px"
  >
    <SingleChat />
  </Box>
  )
}

export default ChatBox