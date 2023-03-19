import React,{useState,useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUserChats, selectSelectedChat, SET_CHATS, SET_SELCTED_CHAT_TO_NULL } from '../../redux/chat/chatSlice';
import { selectUser } from '../../redux/auth/authSlice';
import { Box, Wrap, WrapItem } from '@chakra-ui/layout';
import { Text, IconButton, Spinner, FormControl, Input } from '@chakra-ui/react';
import { BiLeftArrow } from "react-icons/bi";
import ProfileModal from '../modal/ProfileModal';
import { Avatar} from '@chakra-ui/react'
import UpdateGroupModal from '../modal/UpdateGroupModal';
import { sendMessage } from '../../redux/messages/MessagesService';
import { fertchAllMessages,  selectNotifications, SET_ALL_MESSAGES, SET_NOTIFICATIONS } from '../../redux/messages/MessagesSlice';
import ScrolableChat from '../scrollableChat/ScrolableChat';
import {FiSend} from "react-icons/fi"




import io from "socket.io-client";

const ENDPOINT = `https://fullstack-chat-app-backend-production.up.railway.app`;
var soket;
var selectedChatCompare;
const SingleChat = () => {
  const [load, setLoad] = useState(false);
  const [messages, setmesaages] = useState([]);
  const [message, setMessage] = useState();
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const selectedChat = useSelector(selectSelectedChat);
  const [soketConnected, setSoketConnected] = useState(false);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const notifications = useSelector(selectNotifications);
  

  
  useEffect(() => {
    soket = io(ENDPOINT);
    soket.emit("setup", user);
    soket.on("connected", () => setSoketConnected(true));
    soket.on("typing", () => setIsTyping(true));
    soket.on("stop-typing", () => setIsTyping(false));

    // eslint-disable-next-line
  }); 
     
      
      useEffect(() => {
        async function gettingAllMessages() {
          setLoad(true);
          const data = await dispatch(fertchAllMessages(selectedChat !== null && selectedChat?._id));
          dispatch(SET_ALL_MESSAGES(data?.payload));
          setmesaages(data?.payload);
          setLoad(false);
          soket.emit("Join chat", selectedChat?._id);
        }
        gettingAllMessages();
        selectedChatCompare = selectedChat;
      }, [dispatch, selectedChat]);
      
      const handlesendMessage = async (event) => {
        if (event.key === "Enter" && message !== "") {
          soket.emit("stop-typing",selectedChat?._id)
          const formdata = {
            chatId: selectedChat?._id,
            content: message,
          };
          setMessage("");
          try {
            const data = await dispatch(sendMessage(formdata));
            soket.emit("new mesaage", data);
            await dispatch(SET_ALL_MESSAGES([data]));
            setmesaages((prevMessages) => [...prevMessages, data]);
            const chats = await dispatch(getAllUserChats());
            await dispatch(SET_CHATS(chats?.payload))
            
          } catch (error) {
            console.log(error.message);
          }
        }
      };
  
      const sendMessageByClick = async () => {
        if (message !== undefined) {
          soket.emit("stop-typing",selectedChat?._id)
          const formdata = {
            chatId: selectedChat?._id,
            content: message,
          };
          setMessage("");
          try {
            const data = await dispatch(sendMessage(formdata));
            soket.emit("new mesaage", data);
            await dispatch(SET_ALL_MESSAGES([data]));
            setmesaages((prevMessages) => [...prevMessages, data]);
            const chats = await dispatch(getAllUserChats());
            await dispatch(SET_CHATS(chats?.payload))
            
          } catch (error) {
            console.log(error.message);
          }
             
           }
     
      }
    
      
      useEffect(() => {
      
        soket.on("new message received", (newMEssageRecived) => {
        
          if (
            !selectedChatCompare || // if chat is not selected or doesn't match current chat
            selectedChatCompare._id !== newMEssageRecived.chat._id
          
          ) {
            if (!notifications.includes(newMEssageRecived)) {
              dispatch(SET_NOTIFICATIONS(newMEssageRecived));
        

            }
          } else {
            setmesaages([...messages, newMEssageRecived]);
            
            
          }
        }); 

      

      });
      
    const handleTyping = (e) => {
      setMessage(e.target.value);
      if (!soketConnected) return;
      if (!typing) {
        setTyping(true);
        soket.emit("typing",selectedChat?._id)
      };
      let lastTypingTime = new Date().getTime();
      var timerLength = 3000;
      setTimeout(() => {
        var timeNow = new Date().getTime();
        var timeDiff = timeNow - lastTypingTime;
        if (timeDiff >= timerLength && typing) {
          soket.emit("stop-typing", selectedChat?._id);
          setTyping(false)
        }
      },timerLength)
    };
  
  
 
  
    function getUser() {
         return  selectedChat !== null && user?._id === selectedChat?.users[0]?._id ? selectedChat?.users[1] : selectedChat?.users[0];
    
    }
    function getUserImage() {
      const user1Image = selectedChat?.users[0]?.picture?.filePath;
      const user2Image = selectedChat?.users[1]?.picture?.filePath;
  
      return selectedChat !== null && user?._id === selectedChat?.users[0]?._id ? user2Image || user1Image : user1Image || user2Image;
  }
  

   
   

    
    const handleSelection =  async () => {     
      await  dispatch(SET_SELCTED_CHAT_TO_NULL())
    }

    return <>
       
        {
            selectedChat !== null ? (
                <>
                
            <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            width="100%"
              fontFamily="Work sans"
              
            display={"flex"}
            justifyContent={{ base: "space-between" }}
            alignItems="center">
            <IconButton  display={{ base: "flex", md: "none" }}
                            icon={<BiLeftArrow />} onClick={() => handleSelection()} />   
                        {!selectedChat?.isGroupChat ?
                            (<>
                                {user?._id === selectedChat?.users[0]?._id ? selectedChat?.users[1]?.name  : selectedChat?.users[0]?.name  }
                                <ProfileModal user={getUser()} >
                                    <Wrap>
                                        <WrapItem>
                                       <Avatar cursor={"pointer"} border={"2px"} size={"md"} src={getUserImage()} /> 
                        
                                        </WrapItem>
                                    </Wrap>
                                
                                </ProfileModal>
                                  
                            </>) :
                            (<>
                                {selectedChat?.chatName.toUpperCase()}
                                <UpdateGroupModal/>
                            
                            </>)}
                    </Text>
                    <Box
                        display="flex"
                        flexDir="column"
                        justifyContent="flex-end"
                        p={3}
                        bg="linear-gradient(to right top, #3a5a89, #005872, #0e5152, #2a4638, #353a2b)" 
                        w="100%"
                        h="100%"
                        borderRadius="lg"
                        overflowY="hidden"
                    >
                        {load ? (<Spinner size={"xl"} width={60} height={60} alignSelf={"center"} margin={"auto"} color="white" borderWidth={"8px"} />) :
                            (<Box display={"flex"} flexDir={"column"} overflowY={"scroll"} overflow={"hidden"} width={"100%"} height={"100%"}  >
                                <ScrolableChat messages={messages}  />
                            </Box>)
                        }
              <FormControl display={"flex"} alignItems={"center"}  onKeyDown={(event) => handlesendMessage(event)} mt={3} >
             
                <Input variant={"filled"} background="E0E0E0" placeholder='send message' _focus={{ bg: "transparent", borderBlockColor: "white", outline: "none" }} color="white" value={message} onChange={(e) => handleTyping(e)} />
                 {<FiSend size={34}  color={"white"} cursor={"pointer"}  onClick={() => sendMessageByClick()}  />}
                        </FormControl>
                    </Box>
                
                </>
            ) : (
                    <>
                        <Box display={"flex"} alignItems={"center"} justifyContent={"center"} height={"100%"} > 
                            <Text fontSize={"3xl"} pb={3} fontFamily={"work sans"} >
                                  Click on the wanted chat and start conversation
                            </Text>
                        </Box>
                    </> 
            )
            
        }
    
    </>
    
  
}

export default SingleChat