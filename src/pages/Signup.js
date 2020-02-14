import React, { useState } from 'react'
import { Heading,
        Flex, 
        FormControl, 
        Input, 
        FormLabel, 
        FormHelperText, 
        Button,
        Link,
        useToast
      } from '@chakra-ui/core';
import axios from 'axios';
import { useHistory, Link as RouterLink } from 'react-router-dom';


export const Signup = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('');

  const history = useHistory();
  const toast = useToast();

  const handleEmailChange = e => {
    setEmail(e.target.value)
    console.log(props)
  }
  
  const handleUsernameChange = e => {
    setUsername(e.target.value)
  }
  
  const handlePasswordChange = e => {
    setPassword(e.target.value)
  }


  const handleSubmit = e => {
    e.preventDefault();
    
    if(password.length < 8){
      toast({
        title: "Error!",
        description: "Password is too short.",
        status: "error",
        duration: 2000,
        isClosable: true,
      }) 
      return ;
    }

    axios.post('http://localhost:3000/users', { email, username, password })
      .then(res => {
        if(res.status === 201){
          toast({
            title: "Account created.",
            description: "We've created your account for you.",
            status: "success",
            duration: 2000,
            isClosable: true,
          })
          console.log(res.data)
          history.push('/')
        }
        console.log('our res', res)
      }).catch(e => {
        if(e.response.status === 409){
          toast({
            title: "An error occured.",
            description: "Email or Username provided is already taken!",
            status: "error",
            duration: 2000,
            isClosable: true,
          })
        } else {
          toast({
            title: "An error occured.",
            description: "Something went wrong. Check your regiser data, please",
            status: "error",
            duration: 3000,
            isClosable: true,
          })
        }
      })
  }


  return (
      <Flex 
        onSubmit={handleSubmit}
        as="form" 
        direction="column" 
        justify="center" 
        bg="gray.50" 
        maxW="400px" 
        m="100px auto auto" 
        p="10" pt="5" pb="5"
      >
        <Heading pb="3">Signup</Heading>

        <FormControl>
          <FormLabel htmlFor="email"  mt="5">Email Address</FormLabel>
          <Input 
            onChange={e => handleEmailChange(e)}
            type="email" 
            id="email" 
            isRequired={true}
            aria-describedby="Email" 
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="username"> Username</FormLabel>
          <Input 
            onChange={e=> handleUsernameChange(e)}
            type="text" 
            id="username" 
            isRequired={true}
            aria-describedby="User Name" 
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="password" mt="5">Password</FormLabel>
          <Input 
            onChange={e => handlePasswordChange(e)}
            type="password" 
            id="password" 
            isRequired={true}
            aria-describedby="Password" 
        />
        </FormControl>
      
        <FormHelperText>Email &amp; Username must be unique</FormHelperText>
        <Button type="submit" bg="#3f51b5" variantColor="blue" color="white" mt="10">
          Signup
        </Button>
        <div style={{margin: '15px 0 0', textAlign: 'right'}}>
          <Link as={RouterLink} to="/login" textAlign="right" p="10px" mr="-10px" width="40px">Login</Link>
        </div>
      </Flex>
  )
}
