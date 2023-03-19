import React, { useEffect, useState} from 'react';
import { Box, Stack, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import { Button } from "@chakra-ui/react";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import { getAllUserChats, selectChats, SET_SELECTED_CHAT,selectSelectedChat, SET_CHATS} from '../../redux/chat/chatSlice';
import { getLogUser, selectUser } from "../../redux/auth/authSlice";
import { getSender } from '../../redux/chat/chatService';
import GroupChatModal from '../modal/GroupChatModal';







const MyChats = () => {
  const dispatch = useDispatch();
  const dialogebi = useSelector(selectChats);
  const selectedChat = useSelector(selectSelectedChat);
  const user = useSelector(selectUser); 
  const setSelecChat = (chat) => {
      dispatch(SET_SELECTED_CHAT(chat));

  };
  


  useEffect(() => {
    async function getUser() {
      try {
        await dispatch(getLogUser());    
      } catch (error) {
        console.log(error.message)   
      }
    };

    getUser()
  },[dispatch])
  
  useEffect(() => {
    async function getUserChatsAll() {
      try {
        const data = await dispatch(getAllUserChats()); 
         await dispatch(SET_CHATS(data?.payload))
         
      } catch (error) {
      
      }
    };
    getUserChatsAll()
  },[dispatch])
  return (
    <Box
    display={{ base: selectedChat !== null ? "none" : "flex", md: "flex" }}
    flexDirection={"column"}
    alignItems={"center"}
    p={3}
    
      backgroundImage="linear-gradient(to right, #FD6E6A, #FFC600)"
      w={{ base: "100%", md: "31%" }}
    
    borderRadius="lg"
    borderWidth="1px"
  >
    <Box
      pb={3}
      px={3}
      fontSize={{ base: "28px", md: "30px" }}
      fontFamily="Work sans"
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"} 
        w="100%"
    
    >
        Your Chats:
        
        <GroupChatModal>
        <Button
          d="flex"
          justifyContent={"space-between"}
          fontSize={{ base: "17px", md: "10px", lg: "17px" }}
          rightIcon=  {<AiOutlineUsergroupAdd />}
        >
          create group Chat
          </Button>
        </GroupChatModal>
    
    </Box>
      <Box
        display={"flex"}
        flexDirection={"column"}
       p={3}
      bg="#3be936"
        w="100%"
        h="calc(100vh - 200px)" // set a fixed height to the container
      borderRadius="lg"
      overflowY={"scroll"}
      >
        {dialogebi.length === 0 && (<><Text fontSize={23} color={"whatsapp.100"} fontWeight={"extrabold"} margin={10} >You have no chats, please serach for the users and add as many as you wish</Text></>)}
      { dialogebi.length !== 0  && dialogebi !== null ? (
        <Stack overflowY="scroll"  >
          {dialogebi.map((chat) => (
            <Box
              onClick={() => setSelecChat(chat)}
              cursor="pointer"
              bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
              color={selectedChat === chat ? "white" : "black"}
              px={3}
              py={2}
              borderRadius="lg"
              key={chat._id}
            >
              <Text>
                {!chat?.isGroupChat
                  ? getSender(user?._id, chat?.users)
                  : chat.chatName}
              </Text>
              {chat?.latestMessage ? (
  <Text fontSize="xs">
    <b>{chat?.latestMessage?.sender?.name} : </b>
    {chat?.latestMessage?.content.length > 50
      ? chat?.latestMessage?.content.substring(0, 51) + "..."
      : chat?.latestMessage?.content}
  </Text>
) : (
  <Text fontSize="xs">
    No messages
  </Text>
)}
            </Box>
          ))}
        </Stack>
      ) : (
        <></>
      )}
    </Box>
  </Box>
  )
}

export default MyChats