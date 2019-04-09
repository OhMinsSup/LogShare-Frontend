import * as React from 'react';
import Sidebar from 'src/components/base/Sidebar/Sidebar';
import { connect } from 'react-redux';
import { StoreState } from 'src/store/modules';
import { Dispatch, bindActionCreators } from 'redux';
import { baseCreators } from 'src/store/modules/base';
import { match } from 'react-router';
import { History } from 'history';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type OwnProps = {
  match: match<{ id?: string; username?: string }>;
  history: History;
};
type Props = StateProps & DispatchProps & OwnProps;

class SidebarContainer extends React.Component<Props> {
  public onRss = (type: 'user' | 'entire') => {
    const { username } = this.props;

    if (type === 'user') {
      const userUrl = `https://logshare-backend.herokuapp.com/rss/@${username}`;
      window.open(userUrl);
      return;
    } else if (type === 'entire') {
      const entireUrl = `https://logshare-backend.herokuapp.com/rss`;
      window.open(entireUrl);
      return;
    }
  };

  public render() {
    const {
      match: { url },
    } = this.props;

    return <Sidebar url={url} onRss={this.onRss} />;
  }
}

const mapStateToProps = ({ base, user }: StoreState) => ({
  username: user.user && user.user.username,
  width: base.window.width,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  BaseActions: bindActionCreators(baseCreators, dispatch),
});

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(SidebarContainer);
