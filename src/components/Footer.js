import React from 'react'
import { Box, Text } from '@chakra-ui/core' 

export const Footer = () => {
  return (
    <Box as="footer" textAlign="center" p="5" mt="45px" color="teal.500">
      <Text>All copyrights &copy; are reserved {new Date().getFullYear()}</Text>
    </Box>
  )
}
