import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Home, Register } from './pages';

const App = () => (
  <React.Fragment>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/auth-register" component={Register} />
    </Switch>
  </React.Fragment>
);

export default App;
