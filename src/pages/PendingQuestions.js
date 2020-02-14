import React, { useEffect, useReducer, useState } from 'react';
import { questionReducer } from '../reducers/question'
import { getPendingQuestions } from '../actions/question'
import { Question } from '../components/Question'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { Flex, CircularProgress, Text, Stack } from '@chakra-ui/core';

export const PendingQuestions = () => {
  const [questions, dispatch] = useReducer(questionReducer)
  const [hasAuth, setHasAuth] = useState() 

  useEffect(() => {
    getPendingQuestions()(dispatch)
    setHasAuth(true);
    console.log(questions)
  }, [])

  return (
    <>
      <Header hasLoggedIn={true}></Header>
      <Flex direction="column" align="center" justify="center" maxW="500px" minW="50%" m="auto" mt='50px' p="10px"> 
        {
          hasAuth ? (
            <>
              {
                questions ? (
                  questions.questions.length > 0 ? (
                    <Stack w="100%">
                      {
                        questions.questions.map((question) => {
                          return (
                            <Question question={question} key={question._id} />
                          )
                        })
                      }
                    </Stack>
                  ) : (
                    <Text>No questions for now, kindly check this page later</Text>
                  )
                ) : ( //still fetching questions
                  <CircularProgress isIndeterminate size="70px" color="blue"></CircularProgress>
                  )
              }
            </>
          ) : 
          (
            <CircularProgress isIndeterminate size="70px" color="blue"></CircularProgress>
          )
        }
      </Flex>
      <Footer></Footer>
    </>
  )
}
