import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Home, Auth, Write, Post, Tag } from './pages';
import Callback from './containers/etc/Callback';
import Core from './containers/etc/Core';

const App = () => (
  <React.Fragment>
    <meta property="fb:app_id" content="1565906873518620" />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/(recent|trending|seris)" component={Home} />
      <Route exact path="/auth/(register|login)" component={Auth} />
      <Route exact path="/callback" component={Callback} />
      <Route exact path="/write" component={Write} />
      <Route exact path="/post/:id" component={Post} />
      <Route exact path="/tags/:tag" component={Tag} />
    </Switch>
    <Core />
  </React.Fragment>
);

export default App;
