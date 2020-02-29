import React from 'react'
import axios from 'axios';
import { Link as RouterLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { Flex, Link, useToast } from '@chakra-ui/core';

export const Header = ({ hasLoggedIn }) => {
  const history = useHistory();
  const toast = useToast()

  const handleSignout = () => {
    axios.post('users/logout')
      .then(res => {
        if(res.status === 200){
          toast({
            title: "Success!",
            description: "Logged out successfully",
            status: "success",
            duration: 2000,
            isClosable: true,
          })
          history.push('/login')
        }
      })
      .catch(e => {
        toast({
          title: "Error!",
          description: "Something went wrong. Try again, please.",
          status: "error",
          duration: 2000,
          isClosable: true,
        })
      })
  }
  return (
      <Flex as="header" justifyContent="space-between" alignItems="center" minH="60px" bg="gray.50" pl="50px" pr="50px">
        <Link as={RouterLink} to="/" p="25px">AskFM</Link>
      {
        hasLoggedIn && (
          <>
            <div>
              <Link as={RouterLink} to="/" p="25px 15px">Wall</Link>
              <Link as={RouterLink} to="/questions" p="25px">Questions</Link>
            </div>
            <Link onClick={handleSignout} p="25px">Signout</Link>
          </>
        )
      }
    </Flex>
  )
}
