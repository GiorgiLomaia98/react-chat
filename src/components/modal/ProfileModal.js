import React from 'react';
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
  Text
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/authSlice';
const ProfileModal = ({ user, children }) => {
const loggedInUSer = useSelector(selectUser);
const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
     {children !== null ?
        (<span onClick={onOpen} >{children }</span>) :
        (<IconButton display={{base: "flex"}} icon={ <BiShow size={35} />}  onClick={onOpen} />
       )
      }

      <Modal size={"lg"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent h={"410px"}  >
          <ModalHeader  fontSize={"40px"} fontFamily="work sans" display={'flex'} justifyContent="center"  >{user?.name } {user?.lastName} </ModalHeader>
          <ModalCloseButton />    
          <ModalBody  display={"flex"} flexDir={"column"} alignItems={"center"}   justifyContent={"space-between"} >
            <Image
              borderRadius={"full"}
              boxSize={"150px"}
              src={user?.picture?.filePath !== undefined  ? user?.picture?.filePath : "https://www.w3schools.com/howto/img_avatar.png"}
              alt="Profile pic"
            />       
            <Text fontSize={{base:"15px", md: "18px"}} fontFamily="work sans"  >
                EMAIL: {user?.email}
            </Text>
         
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ProfileModal;
