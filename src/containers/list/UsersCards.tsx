import * as React from 'react';
import UserCardList from 'src/components/common/UserCardList';
import { throttle } from 'lodash';
import { StoreState } from 'src/store/modules';
import { getScrollBottom } from 'src/lib/common';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FakeUserCards from 'src/components/common/FakeUserCards';
import { usersCreators } from 'src/store/modules/list/users';
import { match } from 'react-router';
import { History } from 'history';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type OwnProps = { match: match<{ username: string }>; history: History };
type Props = StateProps & DispatchProps & OwnProps;

class UsersCards extends React.Component<Props> {
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
      ListActions.revealUsersPrefetched();
    }

    if (next === this.prev) return;
    this.prev = next;

    ListActions.prefetchUsers({ next });
  };

  public initialize = () => {
    const { ListActions } = this.props;

    ListActions.getUsers();
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

  public render() {
    const { users, loading } = this.props;
    if (loading) return <FakeUserCards users={users} />;

    return <UserCardList users={users} onClick={this.onNavClick} />;
  }
}

const mapStateToProps = ({ list }: StoreState) => ({
  users: list.users.users.user,
  prefetched: list.users.users.prefetched,
  next: list.users.users.next,
  loading: list.users.users.loading,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  ListActions: bindActionCreators(usersCreators, dispatch),
});

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(UsersCards);
