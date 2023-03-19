import {useState} from 'react';
import { BiShow } from 'react-icons/bi';



import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  IconButton,
  Button,
  Image,
    Text,
  useToast,
  Box,

} from '@chakra-ui/react'
import { FormControl } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { serachUser } from '../../redux/auth/authService';
import UserAvatar from '../userAvatar/UserAvatar';
import UserBadgeItem from '../userAvatar/USerBadgeItem';
import {useDispatch, useSelector} from "react-redux"
import { createGroup, getAllUserChats, removePersonFromGroup, renameGroup, selectChats, selectSelectedChat, selectSelectedUsers, SET_SELECTED_CHAT,SET_Selectedusers, selectChat } from '../../redux/chat/chatSlice';
import {selectUser } from '../../redux/auth/authSlice';
import { MdOutlineGroups } from 'react-icons/md';
import { addToGroupChat } from '../../redux/chat/chatService';
import { toast } from 'react-toastify';

const UpdateGroupModal = ({ children }) => {
  const selctedChat = useSelector(selectSelectedChat);
   const selUsers = useSelector(selectSelectedUsers);
  
    const user = useSelector(selectUser)
    const dispatch = useDispatch()
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [groupChatName, setGroupChatName] = useState(selctedChat?.chatName);
    const [selectedUsers, setSelectedUsers] = useState(selctedChat?.users);
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
  const toast = useToast();
 
 

    const handleSearch = async (query) => {
        setSearch(query)
        if (!query) {
            return;
        };
        try {
         setLoading(true)
            const data = await serachUser(query);
            setLoading(false)
            setSearchResult(data);

            
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: "Failed to Load the Search Results",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
              });
            
        };
    };
  
  const updateName = async () => {
    const formdata = {
      chatId: selctedChat?._id,
       name: groupChatName
    }
    try {
      const data = await dispatch(renameGroup(formdata));
      const datas = await dispatch(getAllUserChats()); 
      await dispatch(SET_SELECTED_CHAT(datas?.payload[0]));
    
  

    } catch (error) {
      console.log(error.message)
      
    }
  }

  const handleremove = async (person) => {
    const formdata = {
       chatId: selctedChat?._id,
       userId: person?._id
    }
    try {
      const data = await dispatch(removePersonFromGroup(formdata));
      await dispatch(SET_Selectedusers(data?.payload?.users))
      await dispatch(getAllUserChats())
        
      } catch (error) {
        
      }
  };

  const handleLEave = async () => {
    const formdata = {
      chatId: selctedChat?._id,
      userId: user?._id
   }
   try {
     await dispatch(removePersonFromGroup(formdata));
     await dispatch(getAllUserChats());
     await dispatch(SET_SELECTED_CHAT(null))
       
     } catch (error) {
       
     }
  }
  
  const addNewMember = async (person) => {
    if (selctedChat?.users.find((u)=> u?._id === person?._id)) {
      toast({
          title: `${person?.name} can't be added`,
          description: "user is already added",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom-left",
      });
      return;
  }

    const formdata = {
      chatId: selctedChat?._id,
      userId: person?._id
    };
    try {
      const data = await addToGroupChat(formdata);
      data!== null && await dispatch(SET_Selectedusers(data?.users)) 
      await dispatch(getAllUserChats());
      setSelectedUsers(selctedChat?.users);     
      } catch (error) {
        
      }
      };
     
  return (
    <>
    <Button onClick={onOpen}> <MdOutlineGroups size={36}  />  </Button>

    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
          <ModalHeader>    {user?._id === selctedChat?.groupAdmin?._id  ? "update:" : ""}{selctedChat?.chatName }</ModalHeader>
          <ModalCloseButton />
          {user?._id === selctedChat?.groupAdmin?._id && (
            <ModalBody display={"flex"} flexDir="column" alignItems={"center"}>
            <Box display={"flex"} flexWrap={"wrap"} w="100%"  >
              {selUsers !== null &&  selUsers.map((person, index) => {
                       
                        return (<>      
                            <UserBadgeItem key={ person?._id} user={person} handleFunction={()=> handleremove(person)}  />
                            </>
                           )
                      })}

        </Box>
            <FormControl display={"flex"}  >
              
                          <Input
                              placeholder="update chat name" mb={3}
                              focusBorderColor="black"
                              value={groupChatName}
                             onChange={(e) => setGroupChatName(e.target.value)}
                             />
                            <Button  variant={"solid"} colorScheme={"teal"}  onClick={()=> updateName()}   >Update</Button>
                      </FormControl>
                      <FormControl>
                          <Input
                              placeholder="Add more people to chat" mb={3}
                              focusBorderColor="black"
                              onChange={(e) => handleSearch(e.target.value)}
                          />
                      </FormControl>
                      {loading ? (
              // <ChatLoading />
              <Text>Loading...</Text>
            ) : (
              searchResult
                ?.slice(0, 4)
                .map((user) => (
                  <UserAvatar
                    key={user?._id}
                    user={user}
                    handleFunction= {() =>  addNewMember(user)  }
                  />
                ))
            )}
          
        </ModalBody>
              
              
         )}

{user?._id !== selctedChat?.groupAdmin?._id && <h1 style={{textAlign: "center", padding:"3px"}}  >{selctedChat?.groupAdmin?.name} is the Admin of the groupchat, only admin can add the changes.</h1> } 


          <ModalFooter>
          <Button colorScheme='red'  onClick={()=> handleLEave()}    >
            Leave Group
          </Button>
          
        </ModalFooter>
      </ModalContent>
    </Modal>
  </>

  )
}

export default UpdateGroupModal