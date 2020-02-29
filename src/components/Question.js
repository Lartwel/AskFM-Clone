import React from 'react';
import {Flex, Box, Heading, Text, Link, Button } from '@chakra-ui/core'
import { Link as RouterLink } from 'react-router-dom'

export const Question = ({question, isPending, id}) => {
  return (
    <Box shadow="md" p={5} borderWidth="1px">
      {
        question.answer && (
          <Link as={RouterLink} to={`./profile/${question.owner}`}> {question.owner}</Link>
        )
      }
      <Heading as="h3" fontSize="1.5em" mt={5}>{question.question}</Heading>

    <Flex justifyContent="space-between" mt={4}>
      {question.answer && (
        <Text ml={2}>{question.answer}</Text>
      )}

      {isPending && <Link as={RouterLink} to={`/questions/reply/${id}`}>Reply</Link>}

      <Text textAlign="right">
        By 
        {question.questioner !== 'Anonymous' ? (
          <Link as={RouterLink} to={`./profile/${question.questioner}`}> {question.questioner}</Link>
        ) : (
          ' Anonymous'
        )}
      </Text>
    </Flex>
    </Box>
  )
}
