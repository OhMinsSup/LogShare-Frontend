import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { StoreState } from 'src/store/modules';
import HomeInfo from 'src/components/base/HomeInfo';
import FeedPosts from 'src/components/base/FeaturedPostSidebar';
import FeedUsers from 'src/components/base/FeedUsers';
import { feedsCreators } from 'src/store/modules/list/feeds';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type Props = StateProps & DispatchProps;

class PrimarySidebarContainer extends React.Component<Props> {
  public onRss = () => {
    const entireUrl = `https://logshare-backend.herokuapp.com/rss`;
    window.open(entireUrl);
    return;
  };

  public onGithub = () => {
    const entireUrl = 'https://github.com/OhMinsSup';
    window.open(entireUrl);
    return;
  };

  public onFacebook = () => {
    const entireUrl = 'https://www.facebook.com/profile.php?id=100003582999223';
    window.open(entireUrl);
    return;
  };

  public initialize = () => {
    const { FeedsActions, logged } = this.props;
    if (logged) {
      FeedsActions.getFeedsPost();
      FeedsActions.getFeedsUser();
    }
  };

  public componentDidUpdate(preProps: Props) {
    if (preProps.logged !== this.props.logged) {
      this.initialize();
    }
  }

  public componentDidMount() {
    this.initialize();
  }

  public render() {
    const { users, posts } = this.props;
    return (
      <React.Fragment>
        <FeedUsers user={users} />
        <FeedPosts post={posts} />
        <HomeInfo onRss={this.onRss} onFacebook={this.onFacebook} onGithub={this.onGithub} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ user, list }: StoreState) => ({
  users: list.feeds.users,
  posts: list.feeds.posts,
  logged: !!user.user
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  FeedsActions: bindActionCreators(feedsCreators, dispatch)
});

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(PrimarySidebarContainer);
