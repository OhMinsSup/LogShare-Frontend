import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Home, Auth } from './pages';
import Core from './containers/etc/Core';

const App = () => (
  <React.Fragment>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/(recent|trending|seris)" component={Home} />
      <Route exact path="/auth/(register|login)" component={Auth} />
    </Switch>
    <Core />
  </React.Fragment>
);

export default App;
