import React from 'react';
import { Container,box, Box,Text,Tabs, TabList, TabPanels, Tab, TabPanel} from '@chakra-ui/react'
import Login from '../../components/login/Login';
import Signup from '../../components/signup/Signup';


const HomePage = () => {
  return (
    <Container maxWidth='xl' centerContent >
      <Box
          d="flex"
           justifyContent="center"
          p={3}
          bg="white"
          w="100%"
          m="40px 0 15px 0"
          borderRadius="lg"
          borderWidth="1px solid transparent">
       <Text   fontSize="4xl" fontFamily="Work sans"   >TALK FREE</Text>
      </Box>
      <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px solid transparent" color="black"  >
      <Tabs   isFitted variant="soft-rounded"  colorScheme="green" >
        <TabList mb="1em">
            <Tab width="50%"   >Login</Tab>
            <Tab width="50%"   >Signup</Tab>
        </TabList>
      <TabPanels>
         <TabPanel>
           <Login/>
      </TabPanel>
      <TabPanel>
        <Signup/>
     </TabPanel>
    </TabPanels>
      </Tabs>

      </Box>
    
     </Container>
  )
}

export default HomePage