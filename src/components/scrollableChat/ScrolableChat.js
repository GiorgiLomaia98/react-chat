import { Box } from '@chakra-ui/layout';
import { Avatar, Tooltip } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import ScrollableFeed from 'react-scrollable-feed';
import { selectUser } from '../../redux/auth/authSlice';
import { selectSelectedChat } from '../../redux/chat/chatSlice';
import { isLastMessage, isMessageSender, isSameSenderMargin, isSameUser } from '../../redux/messages/MessagesService';





const ScrolableChat = ({ messages }) => {

  const selectedChat = useSelector(selectSelectedChat);
  const loggedUser = useSelector(selectUser)
 
 
  // function getSenderImage(message) {
  //   if (message && message?.sender?.picture?.filePath) {
         
  //      return  message?.sender?.picture?.filePath
  //      }
  //     }
  
    const user = useSelector(selectUser);
  return (
      <ScrollableFeed>
          {messages.length !== 0 && messages.map((message, index) => {
            return   (
              <Box style={{display:"flex"}} key={index}  >
                  {/* {(isMessageSender(messages, message, index, user?._id) ||
                      isLastMessage(messages, index, user?._id)) &&  (
                      <Tooltip  label={message?.sender?.name}  placement={"bottom-start"} hasArrow >
                    <Avatar
                              mt={"7px"}
                              mr={1}
                              cursor={"pointer"}
                              name={message?.sender?.name}
                              src={getSenderImage(message) }
                    />
                      
                       </Tooltip>
                      )} */}
                   <span
              style={{
                backgroundColor: `${
                  message?.sender?._id === user?._id ? "#BEE3F8" : "#B9F5D0"
                }`,
                marginLeft: isSameSenderMargin(messages,message,index,user?._id) ,
                marginTop: isSameUser(messages,message,index)  ? 3 : 10,
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
              }}
            >
                  {selectedChat && selectedChat?.isGroupChat ? <p> <span style={{fontWeight:"bolder"}}>{ loggedUser && loggedUser?._id ===  message?.sender?._id  ?  "you"  :  message?.sender?.name }:</span>{message?.content}</p>    :    <span>{message?.content}</span>}
            </span>
              </Box>
          )
              
          })}
          {messages.length === 0 && (<><h1>NO MESSAGES</h1></>)}
    </ScrollableFeed>
  )
}

export default ScrolableChat