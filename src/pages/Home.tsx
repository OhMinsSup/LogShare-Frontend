import * as React from 'react';
import PageTemplate from 'src/components/base/PageTemplate';
import LandingTemplateContainer from 'src/containers/landing/LandingTemplateContainer';
import { match } from 'react-router';
import { Location, History } from 'history';

const Home: React.StatelessComponent<{
  match: match<{ tag: string; id: string; username: string }>;
  history: History;
  location: Location;
}> = ({ match, history }) => (
  <PageTemplate>
    <LandingTemplateContainer match={match} history={history} />
  </PageTemplate>
);

export default Home;
