import React, { useState, useEffect, useReducer } from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Flex, CircularProgress, Heading, Text, Stack} from "@chakra-ui/core";
import { questionReducer } from '../reducers/question';
import { getQuestions } from '../actions/question';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Question } from '../components/Question'

export const Wall = function(){

  const [questions, dispatch] = useReducer(questionReducer);
  const [hasAuth, setHasAuth] = useState() 
  const history = useHistory();


  useEffect(() => {
    let unmount = false;
    const source = axios.CancelToken.source() //axios source token needed to clean up the axios request
    const checkAuth = async () => {
      if(!unmount){
        try{
          const res = await axios.get('/wall', { cancelToken: source.token })
          setHasAuth(res.status === 200)
        } catch(e) {
          console.log('ee', e)
          history.push('/login')
        }
      }
    }

    checkAuth();

    return () => { //effect cleanup
      unmount = true;
    };
  }, [])

  useEffect(() => {
    const load = async () => {
      getQuestions(dispatch);
      console.log(questions)
    }; 
    load()
  }, [])

 
  return (
    <>
      <Header hasLoggedIn={true}></Header>
      <Flex direction="column" align="center" justify="center" maxW="500px"  m="auto" mt='50px' p="10px"> 
        {
          hasAuth ? (
            <>
              <Heading m="50px auto 50px" fontSize="xl">Feed</Heading>
              {
                questions ? (
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
