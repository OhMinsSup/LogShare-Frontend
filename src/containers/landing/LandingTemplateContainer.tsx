import * as React from 'react';
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
import UsersCards from '../list/UsersCards';
import CommonTemplate from 'src/components/common/CommonTemplate';
import { History } from 'history';
import VideoCards from '../list/VideoCards';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type OwnProps = {
  match: match<{ id: string }>;
  history: History;
};
type Props = StateProps & DispatchProps & OwnProps;

class LandingTemplateContainer extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    const { AuthActions } = this.props;
    AuthActions.setNextUrl(false);
  }

  public render() {
    const { match, history } = this.props;

    return (
      <CommonTemplate
        mainHead={<HeaderContainer match={match} />}
        mainSidebar={<SidebarContainer match={match} history={history} />}
        primarySidebar={<PrimarySidebarContainer />}
      >
        <Switch>
          <Route exact path="/" component={RecentPostCards} />
          <Route exact path="/recent" component={RecentPostCards} />
          <Route exact path="/trending" component={TrendingPostCards} />
          <Route exact path="/users" component={UsersCards} />
          <Route exact path="/video" component={VideoCards} />
        </Switch>
      </CommonTemplate>
    );
  }
}

const mapStateToProps = (state: StoreState) => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  AuthActions: bindActionCreators(authCreators, dispatch),
});

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(LandingTemplateContainer);
