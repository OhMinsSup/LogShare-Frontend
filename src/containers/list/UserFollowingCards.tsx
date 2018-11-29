import * as React from 'react';
import UserCardList from 'src/components/common/UserCardList';
import { throttle } from 'lodash';
import { StoreState } from 'src/store/modules';
import { getScrollBottom } from 'src/lib/common';
import { Dispatch, bindActionCreators, compose } from 'redux';
import { followsCreators } from 'src/store/modules/list/follows';
import { connect } from 'react-redux';
import { match, withRouter } from 'react-router';
import FakeUserCards from 'src/components/common/FakeUserCards';
import { History } from 'history';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type OwnProps = { match: match<{ username: string }>; history: History };
type Props = StateProps & DispatchProps & OwnProps;

class UserFollowingCards extends React.Component<Props> {
  public prev: string | null = null;

  public onScroll = throttle(() => {
    const scrollButton = getScrollBottom();
    if (scrollButton > 1000) return;
    this.prefetch();
  }, 250);

  public onNavClick = (username: string) => {
    const { history } = this.props;
    history.push(`/@${username}`);
  };

  public prefetch = () => {
    const { ListActions, users, next } = this.props;
    if (!users || users.length === 0) return;

    if (this.props.prefetched) {
      ListActions.revealFollowsUsersPrefetched();
    }

    if (next === this.prev) return;
    this.prev = next;

    ListActions.prefetchFollowUsers({ next });
  };

  public initialize = () => {
    const {
      ListActions,
      match: {
        params: { username },
      },
    } = this.props;

    ListActions.getFollowing({ username });
  };

  public listenScroll = () => {
    window.addEventListener('scroll', this.onScroll);
  };

  public unlistenScroll = () => {
    window.removeEventListener('scroll', this.onScroll);
  };

  public componentDidMount() {
    this.initialize();
    this.listenScroll();
  }

  public componentWillUnmount() {
    this.unlistenScroll();
  }

  public componentDidUpdate(preProps: Props) {
    if (preProps.match.url !== this.props.match.url) {
      this.initialize();
    }
  }

  public render() {
    const { users, loading } = this.props;
    if (loading) return <FakeUserCards users={users} />;

    return <UserCardList users={users} onClick={this.onNavClick} />;
  }
}

const mapStateToProps = ({ list }: StoreState) => ({
  users: list.follows.follows.user,
  prefetched: list.follows.follows.prefetched,
  next: list.follows.follows.next,
  loading: list.follows.follows.loading,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  ListActions: bindActionCreators(followsCreators, dispatch),
});

export default compose(
  withRouter,
  connect<StateProps, DispatchProps, OwnProps>(
    mapStateToProps,
    mapDispatchToProps
  )
)(UserFollowingCards);
