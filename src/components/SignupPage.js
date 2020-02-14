import React, { useState } from 'react'
import { Heading,
        Flex, 
        FormControl, 
        Input, 
        FormLabel, 
        FormErrorMessage, 
        FormHelperText, 
        Button,
        Link
      } from '@chakra-ui/core';
import axios from 'axios';
import { useHistory, Link as RouterLink } from 'react-router-dom';


export const SignupPage = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('');

  const history = useHistory();
  
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
    console.log(email, username, password)
    axios.post('http://localhost:3000/users', { email, username, password })
      .then(res => {
        if(res.status === 201){
          console.log(res.data)
          history.push('/')
        }
      }).catch(e => {
        console.log(email, username, password)
        console.log(e)
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
          <FormLabel htmlFor="password" mt="5">Passowrd</FormLabel>
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
        <Link as={RouterLink} to="/signup" textAlign="right" pt={5}>Login</Link>
      </Flex>
  )
}
