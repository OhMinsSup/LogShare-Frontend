import * as React from 'react';
import LandingTemplate from 'src/components/landing/LandingTemplate';
import HeaderContainer from '../base/HeaderContainer';
import SidebarContainer from '../base/SidebarContainer';
import PrimarySidebarContainer from '../base/PrimarySidebarContainer';
import { match, Switch, Route } from 'react-router';
import RecentPostCards from '../list/RecentPostCards';

type OwnProps = {
  match: match<{ id: string }>;
};
type Props = OwnProps;

class LandingTemplateContainer extends React.Component<Props> {
  public render() {
    const {
      match: { url },
    } = this.props;

    return (
      <LandingTemplate
        mainHead={<HeaderContainer match={this.props.match} />}
        mainSidebar={<SidebarContainer url={url} />}
        primarySidebar={<PrimarySidebarContainer />}
      >
        <Switch>
          <Route exact path="/" component={RecentPostCards} />
          <Route exact path="/recent" component={RecentPostCards} />
          <Route exact path="/trending" component={Trending} />
          <Route exact path="/seris" component={Series} />
        </Switch>
      </LandingTemplate>
    );
  }
}

const Trending = () => <div>Trending</div>;
const Series = () => <div>Series</div>;

export default LandingTemplateContainer;
