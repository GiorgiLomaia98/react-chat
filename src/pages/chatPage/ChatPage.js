import React from 'react';
import { useSelector } from 'react-redux';
import SideDrawer from '../../components/sideDrawer/SideDrawer';
import ChatBox from '../../components/chatBox/ChatBox';
import MyChats from '../../components/myChats/MyChats';
import { selectIsLoggedIn } from '../../redux/auth/authSlice';
import {Box} from "@chakra-ui/layout"



const ChatPage = () => {

  console.log(process.env.REACT_APP__BACKEND_URL,"egii")

  const isLoggedIn = useSelector(selectIsLoggedIn);


  return (
    <Box style={{ width: "100%" }} >
      {isLoggedIn && <SideDrawer />}
      <Box display="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px" >
        {isLoggedIn && <MyChats />}
        {isLoggedIn && <ChatBox />}

      </Box>


    </Box>
  )
}

export default ChatPage