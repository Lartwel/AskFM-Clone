import React from 'react';
import { ThemeProvider, CSSReset } from '@chakra-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Login } from '../pages/Login';
import { Signup } from '../pages/Signup';
import { Wall } from '../pages/Wall';
import { PendingQuestions } from '../pages/PendingQuestions'
import { Reply } from '../pages/Reply'

function App() {
  return (
    <ThemeProvider>
      <CSSReset/>
      <Router>
        <Switch>
          <Route path="/" exact>
            <Wall />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/questions" exact>
            <PendingQuestions></PendingQuestions>
          </Route>
          <Route path="/questions/reply/:id" exact>
            <Reply></Reply>
          </Route>
        </Switch>
      </Router>
    </ ThemeProvider>
  );
}

export default App;
