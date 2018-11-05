import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Home, Auth } from './pages';

const App = () => (
  <React.Fragment>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/(recent|trending)" component={Home} />
      <Route exact path="/auth/(register|login)" component={Auth} />
    </Switch>
  </React.Fragment>
);

export default App;
