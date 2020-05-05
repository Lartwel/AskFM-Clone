import React, { useState, useReducer, useEffect } from 'react'
import { Flex, Heading, Textarea, Button, useToast, CircularProgress } from '@chakra-ui/core'
import { useHistory, useParams } from 'react-router-dom';
import { Header } from '../components/Header';
import { questionReducer } from '../reducers/question'
import { getQuestion, addAnswer } from '../actions/question';


export const Reply = React.memo((props) => {
  const [question, dispatch] = useReducer(questionReducer)
  const [answer, setAnswer] = useState('')
  const [hasAuth, setHasAuth] = useState() 

  const history = useHistory();
  const { id } = useParams()
  const toast = useToast();

  useEffect(() => {
    getQuestion(id)(dispatch)
  }, [])

  useEffect(() => {
    if(question){
      setHasAuth(true)
    }
  }, [question])

  const handleAnswerChange = e => {
    setAnswer(e.target.value)
  }
  
  const handleSubmit = e => {
    e.preventDefault();
    let a = addAnswer(answer, id)(dispatch)
    console.log(a);
    toast({
      title: "Answer Added.",
      description: "You're answered was added successfully.",
      status: "success",
      duration: 2000,
      isClosable: true,
    })
    history.push('/');
  }

  return (
    hasAuth ? (
    <>
      <Header hasLoggedIn={true}>Reply to the question</Header>

      <Flex
        onSubmit={handleSubmit}
        as="form" 
        direction="column" 
        justify="center" 
        bg="gray.50" 
        maxW="600px" 
        m="100px auto auto" 
        p="10" pt="5" pb="5"
      >
      <Heading pb="3">{question.question}</Heading>

      <Textarea placeholder="Here is a sample placeholder" onChange={e => handleAnswerChange(e)} />
      <Button type="submit" bg="#3f51b5" variantColor="blue" color="white" mt="10">
        Reply
      </Button>
        
      </Flex>
    </>
    ) : (
      <Flex direction="column" align="center" justify="center" height="100vh">
        <CircularProgress isIndeterminate size="70px" color="blue"></CircularProgress>
      </Flex>
    )
    
  )
})
