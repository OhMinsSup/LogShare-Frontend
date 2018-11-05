import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import AuthTemplate from 'src/components/auth/AuthTemplate';
import RegisterFormContainer from 'src/containers/auth/RegisterFormContainer';
import LoginFormContainer from 'src/containers/auth/LoginFormContainer';

const Auth = () => (
  <AuthTemplate>
    <Switch>
      <Route path="/auth/register" component={RegisterFormContainer} />
      <Route path="/auth/login" component={LoginFormContainer} />
    </Switch>
  </AuthTemplate>
);

export default Auth;
