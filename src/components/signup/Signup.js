import React,{useState} from 'react';
import { Button, ButtonGroup, useToast,Avatar, AvatarBadge, AvatarGroup  } from '@chakra-ui/react'
import { Stack, VStack } from '@chakra-ui/layout';
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { BiShow, BiHide } from "react-icons/bi";
import { registerUser, validateEmail } from '../../redux/auth/authService';
import { useDispatch } from 'react-redux';
import { SET_NAME, SET_LOGIN, SET_USER} from "../../redux/auth/authSlice";
import { useNavigate } from 'react-router-dom';

const inistialState = {
  name: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: ""

};


const Signup = () => {



  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [productImage, setProductImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [show, setIshown] = useState(false);
  const [loading,setIsLoading] = useState(false)
  const [formData, setFormData] = useState(inistialState);
  const { name, lastName, email, password, confirmPassword , picture} = formData;
  const toast = useToast()

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value })
  };

  const handleImageChange = (e) => {

    setProductImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
   
  };



  const onRegister = async () => {

    if (!name || !lastName || !password || !email) {
      toast({
        title: "all fields are required",
        status: "warning",
        duration: 4000,
        isClosable: true,
        position: "top-left"
      });
      return;
    };
    if (!confirmPassword) {
      toast({
        title: "please confirm password",
        status: "warning",
        duration: 4000,
        isClosable: true,
        position: "top-left"
      });
      return;
    };
    if (password !== confirmPassword) {
      toast({
        title: "passwords do not match",
        status: "warning",
        duration: 4000,
        isClosable: true,
        position: "top-left"
      });
      return;
    };
    if (password.length < 6) {
      toast({
        title: "passwords must be longer thab 6 charachters",
        status: "warning",
        duration: 4000,
        isClosable: true,
        position: "top-left"
      });
      return;
      
    };
    if (!validateEmail(email)) {
      toast({
        title: "email is not valid",
        status: "warning",
        duration: 4000,
        isClosable: true,
        position: "top-left"
      });
      return;
    };
    setIsLoading(true)
    const userData = new FormData();
userData.append('name', name);
userData.append('lastName', lastName);
userData.append('email', email);
userData.append('password', password);
userData.append('picture', productImage);

    try {
       
      const data = await registerUser(userData);
      await dispatch(SET_LOGIN(true));
      await dispatch(SET_NAME(data?.name));
      await dispatch(SET_USER(data))
      setIsLoading(false);
      navigate("/chat")
    } catch (error) {
      setIsLoading(false);
      console.log(error.message)
      
    }

   
  };
  return (
    <VStack spacing="5px" color="black">
      <Stack direction='row'>
       <Avatar size={"2xl"} src={`${imagePreview !== null ? imagePreview : 'https://bit.ly/broken-link'}`} />
        
        </Stack>

      <FormControl id='First-Name' isRequired  >
        <FormLabel>Name</FormLabel>
        <Input placeholder='Enter Your name' className='input' name='name' value={name} onChange={handleInputChange} />
      </FormControl>
      <FormControl id='Second-Name' isRequired  >
        <FormLabel>Second Name</FormLabel>
        <Input placeholder='Enter Your last name' className='input'name='lastName' value={lastName} onChange={handleInputChange} />
      </FormControl>
      <FormControl id='Email' isRequired  >
        <FormLabel>Email</FormLabel>
        <Input placeholder='Enter Your email' className='input' name='email' value={email} onChange={handleInputChange}  />
      </FormControl>
      <FormControl id='Password' isRequired  >
        <FormLabel>password</FormLabel>
        <InputGroup>
          <Input placeholder='Enter Your name' className='input' type={ show ? "text" :  "password"} name='password' value={password} onChange={handleInputChange}  />
          <InputRightElement >
            <Button  colorScheme='white' size='xl' onClick={()=> setIshown(prevValue => !prevValue)}  > {!show ? <BiShow color='gray'/> : <BiHide color='gray'/>  } </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id='Confirm-Password' isRequired  >
        <FormLabel>Confirm  password</FormLabel> 
          <Input placeholder='Confirm password' className='input' type={"password"} name='confirmPassword' value={confirmPassword} onChange={handleInputChange} />  
      </FormControl>
      <FormControl id='pic' isRequired  >
        <FormLabel>Upload your profile picture</FormLabel> 
        <Input className='input'
          type='file'
          p={1.5}
          name='picture'
          id="fileInput"
          style={{ display: "none" }}
          onChange={(e) => handleImageChange(e)} />  
      </FormControl>
      <button  style={{ marginTop: 15, width:"75%", background:"lime", color:"white", padding:"5px", borderRadius:"10px" }}   type="button" onClick={() => document.getElementById("fileInput").click()}>
        upload image
      </button>


      <Button
        colorScheme="blue"
        type='submmit'
        width="100%"
        style={{ marginTop: 15 }}
        onClick={()=> onRegister()}
        >
        Sign Up
      </Button>
      </VStack>
  )
}

export default Signup