import React, { useEffect, useState } from 'react'
import { Box } from '@chakra-ui/layout';
import { AiFillBell, AiFillCodepenSquare, AiOutlineArrowDown } from 'react-icons/ai';
import {FcSearch} from "react-icons/fc"
import { Button } from '@chakra-ui/button';
import {
  Tooltip,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  MenuDivider,
  Avatar,
  useDisclosure,
  useToast
  
} from '@chakra-ui/react';

import {Input}  from '@chakra-ui/input'
import { ImSearch } from "react-icons/im";
import { useDispatch, useSelector } from 'react-redux';
import { getLogUser, selectUser, SET_LOGIN, SET_NAME, SET_USER} from '../../redux/auth/authSlice';
import ProfileModal from '../modal/ProfileModal';
import { logOutUser, serachUser } from '../../redux/auth/authService';
import { useNavigate } from 'react-router-dom';
import ChatLoading from '../chatLoading/ChatLoading';
import UserAvatar from '../userAvatar/UserAvatar';
import { accetUsersChat, selectChat, getAllUserChats, selectSelectedChat, SET_SELECTED_CHAT, SET_SELCTED_CHAT_TO_NULL } from '../../redux/chat/chatSlice';
import { selectNotifications } from '../../redux/messages/MessagesSlice';
import { getSender } from '../../redux/chat/chatService';





const person = {
  _id: "",
  name: "",
  lastName: "",
  email: "",
  bio: "",
  phone: "",
  picture: null
}

const SideDrawer = () => {

  const toast = useToast();
  const navigate = useNavigate()
  const [prof, setProf] = useState(person);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setIsLoading] = useState(false)
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const chat = useSelector(selectChat);
  const selectedChat = useSelector(selectSelectedChat);
  const notifications = useSelector(selectNotifications);
  console.log(notifications, "notifikaciebi")

  const accesChat = async (userId) => {
    try {
      const data = await dispatch(accetUsersChat(userId));
  
      
    } catch (error) {
      
    }
  };


  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "please eneter something",
        status: "warning",
        duration: 4000,
        isClosable: true,
        position: "top-left"
      });
      return;
    }
   
    try { 
      setIsLoading(true)
      const data = await serachUser(search);
      setIsLoading(false)
      setSearchResults(data);
      
      
    } catch (error) {
      setIsLoading(false)

      toast({
        title: "An Error occured",
        description: "failed to search other users,please try again later.",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top-left"
      });
      
    }

  }
  useEffect(() => {

    async function getUser() {
      try {
        const data = await dispatch(getLogUser());
        await dispatch(SET_USER(data))
      } catch (error) {

        console.log(error.message)
        
      }
    };

    getUser()
    
  }, [dispatch]);

  const logout = async () => {
    try {
      await logOutUser();
      await dispatch(SET_LOGIN(false));
      await dispatch(SET_USER(prof));
      await dispatch(SET_NAME(""))
      navigate("/")
      
    } catch (error) {

      console.log(error.message)
      
    } 
    
  }
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
   <Box   backgroundImage="linear-gradient(to right, #FD6E6A, #FFC600)"
 display={"flex"} justifyContent={"space-between"} alignItems={"center"} w="100%" p={"5px 10px 5px 10px"} borderWidth={"5px"}>
  <Tooltip label='search users to chat' hasArrow placement='bottom-end'>
    <Button variant={"ghost"} onClick={onOpen}>
      <ImSearch />
      <Text display={{ base: "none", md: "flex" }} px="4">Search for users</Text>
    </Button>
  </Tooltip>
  <Text fontSize={"2xl"} fontFamily="work sans">TALK FREE</Text>
  <Box>
    <Menu>
      <MenuButton p={1}>
        <div style={{display: "flex", alignItems:"center"}}>
          <AiFillBell color='blue' /> { notifications.length !==0 &&  <div style={{ width:"25px", height:"25px", display:"flex", textAlign:"center", justifyContent:"center", borderRadius:"50%", backgroundColor:"red"}}   >{notifications.length !== 0 && <span style={{color:'white'}}   >{notifications.length}  </span>}</div>}
        </div>
      </MenuButton>
      <MenuList pl={4} color={"green"} backgroundColor={"ButtonFace"}>
        {notifications.length === 0 && "No new messages"}
        {notifications.length !== 0 && notifications.map((notific) => {
          return(
            <MenuItem key={notific?._id} onClick={()=> dispatch(SET_SELECTED_CHAT(notific?.chat))}>
              {notific?.chat?.isGroupChat ? `New message in ${notific?.chatName}` : `New message from ${getSender(user?._id, notific?.chat?.users)}  `}
            </MenuItem>
          )
        })}
      </MenuList>
    </Menu>
    <Menu>
      <MenuButton as={Button} rightIcon={<AiOutlineArrowDown />}>
        <Avatar size={'sm'} cursor="pointer" name={user?.name} src={user?.picture} />
      </MenuButton>
      <MenuList>
        <ProfileModal user={user}>
          <MenuItem>My profile</MenuItem>
        </ProfileModal>
        <MenuDivider />
        <MenuItem onClick={()=> logout()}>
          Log out
        </MenuItem>
      </MenuList>
    </Menu>
  </Box>
</Box>


      <Drawer placement='left' onClose={onClose} isOpen={isOpen} >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth={"1px"}   >Search for frineds, {user?.name}</DrawerHeader>
          <DrawerBody>
          <Box display={"flex"} pb={"2px"} >
            <Input placeholder='search by name or email' mr={2} value={search} onChange={(e) => setSearch(e.target.value)} />
            <Button onClick={()=> handleSearch()}  >{<FcSearch/> }</Button>
            </Box>
            {loading ? <ChatLoading /> :
              (
                searchResults.length !== 0 && searchResults?.map((person, index) => {
                  return (
                    <UserAvatar key={person?._id}  user={person} handleFunction={()=> accesChat(person?._id)} />

                   )
                })
              )
            }
        </DrawerBody>
        </DrawerContent>
      </Drawer>
      
      </>

  )
}

export default SideDrawer