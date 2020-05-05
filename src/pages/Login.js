import React, { useState, useEffect } from 'react'
import { 
        CircularProgress,
        Heading,
        Flex, 
        FormControl, 
        Input, 
        FormLabel, 
        Button,
        Link,
        useToast
      } from '@chakra-ui/core';
import axios from 'axios';
import { useHistory, Link as RouterLink } from 'react-router-dom';
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

export const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [checkedAuth, setCheckedAuth] = useState(false)

  const history = useHistory();
  const toast = useToast();

  useEffect(() => { // redirect to wall if user has been authenticated before
    const source = axios.CancelToken.source();
    axios.get('users/login')
    .then(res => {
      if(res.status === 200)
        history.push('/')
    })
    .catch(() => {
      setCheckedAuth(true)
      return null;
    });
    return () => {
      source.cancel();
    }
  }, [])

  const handleEmailChange = e => {
    setEmail(e.target.value)
  }
  
  const handlePasswordChange = e => {
    setPassword(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault();
    axios.post('users/login', { email, password })
    .then(res => {
        if(res.status === 200){
          toast({
            title: "Success!",
            description: "Logged in successfully",
            status: "success",
            duration: 2000,
            isClosable: true,
          })
          history.push('/')
        }
      }).catch(e => {
        if(e.response.status === 400){
          toast({
            title: "Error!",
            description: "Email or password are incorrect.",
            status: "error",
            duration: 2000,
            isClosable: true,
          })
        } else{
          toast({
            title: "Error!",
            description: "Something went wrong. Contact the adminstrator, please.",
            status: "error",
            duration: 2000,
            isClosable: true,
          })
        }
      })
  }


  return (
    <>
      <Header hasLoggedIn={false}></Header>
     {
      checkedAuth ? (
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
            <Heading pb="3">Login</Heading>
            <FormControl>
              <FormLabel htmlFor="email">Email Address</FormLabel>
              <Input 
                onChange={e => handleEmailChange(e)}
                type="email" 
                id="email" 
                isRequired={true}
                aria-describedby="Email" 
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
            <Button type="submit" bg="#3f51b5" variantColor="blue" color="white" mt="10">
              Login
            </Button>
            <div style={{margin: '15px 0 0', textAlign: 'right'}}>
              <Link as={RouterLink} to="/signup" textAlign="right" p="10px" mr="-10px" width="40px">Signup</Link>
            </div>
          </Flex>
        )
        : (
          <Flex direction="column" align="center" justify="center" height="100vh">
            <CircularProgress isIndeterminate size="70px" color="blue"></CircularProgress>
          </Flex>
        )
      }
      <Footer></Footer>
    </>
  )
}
