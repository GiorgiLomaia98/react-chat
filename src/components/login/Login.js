import React,{useState} from 'react';
import { Button } from '@chakra-ui/react'
import { VStack } from '@chakra-ui/layout';
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { BiShow, BiHide } from "react-icons/bi";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser, validateEmail } from '../../redux/auth/authService';
import { SET_LOGIN, SET_NAME, SET_USER } from '../../redux/auth/authSlice';
import { useToast } from '@chakra-ui/react';




const inistialState = {
  email: "",
  password: ""

}

const Login = () => {
  const toast = useToast()
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setIshown] = useState(false);
  const [loading,setIsLoading] = useState(false)
  const [formData, setFormData] = useState(inistialState);
  const { email, password } = formData;
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value })
  };

  const onLogin = async () => {

    if (!password || !email) { 
      toast({
        title: "all fields are required",
        status: "warning",
        duration: 4000,
        isClosable: true,
        position: "top-left"
      });
    };
   if(!validateEmail(email)) {
    toast({
      title: "email is not valid",
      status: "error",
      duration: 4000,
      isClosable: true,
      position: "top-left"
    });
    };
    setIsLoading(true)
    const userData = {
      email,
      password
    }

    try {   
      const data = await loginUser(userData);
      console.log(data, "dataaaa dzmao ager es");
      await dispatch(SET_LOGIN(true));
      await dispatch(SET_NAME(data?.name));
      await dispatch(SET_USER(data))
      setIsLoading(false);
      navigate("/chat")
    } catch (error) {
      setIsLoading(false);
      console.log(error.message)
      
     }

   
  }



  return (
    <VStack spacing="5px" color="black">
        <FormControl id='Email' isRequired  >
        <FormLabel>Email</FormLabel>
        <Input placeholder='Enter Your email' className='input' name='email' value={email} onChange={handleInputChange} />
      </FormControl>
      <FormControl id='First-Name' isRequired  >
        <FormLabel>password</FormLabel>
        <InputGroup>
          <Input placeholder='Enter Your name' className='input' type={ show ? "text" :  "password"} name='password' value={password} onChange={handleInputChange} />
          <InputRightElement >
            <Button  colorScheme='white' size='xl' onClick={()=> setIshown(prevValue => !prevValue)}  > {!show ? <BiShow color='gray'/> : <BiHide color='gray'/>  } </Button>
          </InputRightElement>

        </InputGroup>
      </FormControl>
      <Button
        colorScheme="blue"
        type='submmit'
        width="100%"
        style={{ marginTop: 15 }}
        onClick={()=> onLogin()}
        >
        Login
      </Button>

    </VStack>
  )
}

export default Login