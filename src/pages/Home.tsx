import * as React from 'react';
import PageTemplate from 'src/components/base/PageTemplate';
import LandingTemplateContainer from 'src/containers/landing/LandingTemplateContainer';
import { match } from 'react-router';
import { Location } from 'history';

const Home: React.StatelessComponent<{
  match: match<{ id: string }>;
  location: Location;
}> = ({ match }) => (
  <PageTemplate>
    <LandingTemplateContainer match={match} />
  </PageTemplate>
);

export default Home;
