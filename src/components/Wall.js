import React, { useState, useEffect, useReducer } from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Flex, CircularProgress, Heading } from "@chakra-ui/core";
import { questionReducer } from '../reducers/question';
import { getQuestions } from '../actions/question';

export const Wall = function(){

  const [questions, dispatch] = useReducer(questionReducer);
  console.log(questions)
  const [hasAuth, setHasAuth] = useState() 
  const [checkAgain, setCheckAgain] = useState(false) 
  const history = useHistory();


  useEffect(() => {
    let unmount = false;
    const source = axios.CancelToken.source() //axios source token needed to clean up the axios request
    const checkAuth = async () => {
      if(!unmount){
        try{
          const res = await axios.get('/wall', { cancelToken: source.token })
          setHasAuth(res.status === 200 || res.status === 201)
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
  })

  useEffect(() => {
    const load = async () => {
      getQuestions(dispatch);
    }; load()
  }, [checkAgain])

  const handleLogoutAll = () => {
    axios.post('users/logout')
      .then(res => {
        if(res.status === 200){
          history.push('/login')
        }
      })
      .catch(e => {
        console.log('logout all err', e)
      })
  }
  return (
    <Flex direction="column" align="center" justify="center" height="100vh"> 
      {
        hasAuth ? (
          <>
            <Heading>Welcome Home</Heading>
            <div>
              <button onClick={handleLogoutAll}>Logout</button>
            </div>
            <div>
              <button onClick={e => setCheckAgain(!checkAgain)} >checkAgain</button>
            </div>
          </>
        ) : 
        (
          <CircularProgress isIndeterminate size="70px" color="blue"></CircularProgress>
        )
      }
    </Flex>
  )
}
