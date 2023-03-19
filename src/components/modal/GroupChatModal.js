import {useState} from 'react';
import { BiShow } from 'react';


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
import {useDispatch} from "react-redux"
import { createGroup } from '../../redux/chat/chatSlice';

const GroupChatModal = ({ children }) => {
    const dispatch = useDispatch()
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [groupChatName, setGroupChatName] = useState("");
    const [selectedUsers, setSelectedUsers] = useState([]);
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
            console.log(searchResult)

            
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

    const handleSubmit = async () => {

        const formData = {
            name: groupChatName,
            users: JSON.stringify(selectedUsers)
        }
        
        try {
            const data = await dispatch(createGroup(formData));
          
            
        } catch (error) {
          console.log(error.message);
          toast({
            title: `${error.message}`,
            description: "cannot do changes",
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: "bottom-left",
        });
        }



    };

    const handleGroup = (groupChatuser) => {
        if (selectedUsers.includes(groupChatuser)) {
            toast({
                title: `${groupChatuser?.name} can't be added`,
                description: "user is already added",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
            return;
        }
        setSelectedUsers([...selectedUsers, groupChatuser])
        
    };
    const handleDelete = (delUser) => {
        setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
      };

  return (
    <>
    <Button onClick={onOpen}>Create Group Chat</Button>

    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Group Chat</ModalHeader>
        <ModalCloseButton />
                  <ModalBody display={"flex"} flexDir="column" alignItems={"center"}>
                      <FormControl>
                          <Input
                              placeholder="Chat Name" mb={3}
                              focusBorderColor="black"
                              onChange={(e) => setGroupChatName(e.target.value)}
                          />
                      </FormControl>
                      <FormControl>
                          <Input
                              placeholder="search for friends " mb={3}
                              focusBorderColor="black"
                              onChange={(e) => handleSearch(e.target.value)}
                          />
                      </FormControl>
                      <Box display={"flex"} flexWrap={"wrap"} w="100%"  >
                      {selectedUsers.map((person, index) => {
                          return (
                            <UserBadgeItem key={ person?._id} user={person} handleFunction={()=> handleDelete(person)}  />
         
                           )
                      })}

                      </Box>
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
                    handleFunction={() => handleGroup(user)}
                  />
                ))
            )}
          
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='blue'  onClick={handleSubmit}>
            start group chat
          </Button>
          
        </ModalFooter>
      </ModalContent>
    </Modal>
  </>

  )
}

export default GroupChatModal