import React from 'react';
import { ThemeProvider, CSSReset } from '@chakra-ui/core';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { LoginPage } from '../components/LoginPage'
import { SignupPage } from '../components/SignupPage';
import { Wall } from '../components/Wall'

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
            <LoginPage />
          </Route>
          <Route path="/signup">
            <SignupPage />
          </Route>
        </Switch>
      </Router>
    </ ThemeProvider>
  );
}

export default App;
