import * as React from 'react';
import LandingTemplate from 'src/components/landing/LandingTemplate';
import HeaderContainer from '../base/HeaderContainer';
import SidebarContainer from '../base/SidebarContainer';
import PrimarySidebarContainer from '../base/PrimarySidebarContainer';
import { match, Switch, Route } from 'react-router';

type OwnProps = {
  match: match<string>;
};
type Props = OwnProps;

class LandingTemplateContainer extends React.Component<Props> {
  public render() {
    const {
      match: { url },
    } = this.props;
    return (
      <LandingTemplate
        mainHead={<HeaderContainer />}
        mainSidebar={<SidebarContainer url={url} />}
        primarySidebar={<PrimarySidebarContainer />}
      >
        <Switch>
          <Route exact path="/recent" component={Recent} />
          <Route exact path="/trending" component={Trending} />
          <Route exact path="/seris" component={Series} />
        </Switch>
      </LandingTemplate>
    );
  }
}

const Recent = () => <div>Recent</div>;
const Trending = () => <div>Trending</div>;
const Series = () => <div>Series</div>;

export default LandingTemplateContainer;
