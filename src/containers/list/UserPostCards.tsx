import * as React from 'react';
import PostCardList from 'src/components/common/PostCardList';
import { connect } from 'react-redux';
import { throttle } from 'lodash';
import { Dispatch, bindActionCreators, compose } from 'redux';
import { postsCreators } from 'src/store/modules/list/posts';
import { StoreState } from 'src/store/modules';
import { getScrollBottom } from 'src/lib/common';
import FakePostCards from 'src/components/common/FakePostCards';
import { withRouter, match } from 'react-router-dom';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type OwnProps = { match: match<{ username: string }> };
type Props = StateProps & DispatchProps & OwnProps;

class UserPostCards extends React.Component<Props> {
  public prev: string | null = null;

  public onScroll = throttle(() => {
    const scrollButton = getScrollBottom();
    if (scrollButton > 1000) return;
    this.prefetch();
  }, 250);

  public prefetch = () => {
    const { ListActions, posts, next } = this.props;
    if (!posts || posts.length === 0) return;

    if (this.props.prefetched) {
      ListActions.revealPostsPrefetched();
    }

    if (next === this.prev) return;
    this.prev = next;

    ListActions.prefetchPosts({ next });
  };

  public initialize = () => {
    const {
      ListActions,
      match: {
        params: { username },
      },
    } = this.props;
    ListActions.getPosts({ username });
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
    const { posts, loading } = this.props;
    if (loading) return <FakePostCards oneColumn={false} posts={posts} />;

    return <PostCardList posts={posts} />;
  }
}

const mapStateToProps = ({ list }: StoreState) => ({
  posts: list.posts.posts.post,
  prefetched: list.posts.posts.prefetched,
  next: list.posts.posts.next,
  loading: list.posts.posts.loading,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  ListActions: bindActionCreators(postsCreators, dispatch),
});

export default compose(
  withRouter,
  connect<StateProps, DispatchProps, OwnProps>(
    mapStateToProps,
    mapDispatchToProps
  )
)(UserPostCards);
