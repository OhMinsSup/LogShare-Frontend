import * as React from 'react';
import LandingTemplate from 'src/components/landing/LandingTemplate';
import HeaderContainer from '../base/HeaderContainer';
import SidebarContainer from '../base/SidebarContainer';
import PrimarySidebarContainer from '../base/PrimarySidebarContainer';
import { match, Switch, Route } from 'react-router';
import RecentPostCards from '../list/RecentPostCards';
import TrendingPostCards from '../list/TrendingPostCards';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { authCreators } from 'src/store/modules/auth';
import { StoreState } from 'src/store/modules';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type OwnProps = {
  match: match<{ id: string }>;
};
type Props = StateProps & DispatchProps & OwnProps;

class LandingTemplateContainer extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    const { AuthActions } = this.props;
    AuthActions.setNextUrl(false);
  }

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
          <Route exact path="/trending" component={TrendingPostCards} />
          <Route exact path="/seris" component={Series} />
        </Switch>
      </LandingTemplate>
    );
  }
}

const Series = () => <div>Series</div>;

const mapStateToProps = (state: StoreState) => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  AuthActions: bindActionCreators(authCreators, dispatch),
});

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(LandingTemplateContainer);
