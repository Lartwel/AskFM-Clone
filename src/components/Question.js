import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/core'

export const Question = ({question}) => {
  console.log('answer', question)
  return (
    <Box shadow="md" p={5} borderWidth="1px">
      <Heading as="h3" fontSize="x1">{question.question}</Heading>
      {question.answer && (
        <Text mt={4}>{question.answer}</Text>
        )}
    </Box>
  )
}
