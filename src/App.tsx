import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Home } from './pages';

const App = () => (
  <React.Fragment>
    <Switch>
      <Route exact path="/" component={Home} />
    </Switch>
  </React.Fragment>
);

export default App;
