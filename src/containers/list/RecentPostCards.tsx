import * as React from 'react';
import PostCardList from 'src/components/common/PostCardList';
import { connect } from 'react-redux';
import { throttle } from 'lodash';
import { Dispatch, bindActionCreators } from 'redux';
import { postsCreators } from 'src/store/modules/list/posts';
import { StoreState } from 'src/store/modules';
import { getScrollBottom } from 'src/lib/common';
import FakePostCards from 'src/components/common/FakePostCards';

type OwnProps = {};
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type Props = StateProps & DispatchProps & OwnProps;

class RecentPostCards extends React.Component<Props> {
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
    const { ListActions, posts } = this.props;
    if (posts && posts.length > 0) return;
    ListActions.getPosts();
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

export default connect<StateProps, DispatchProps, OwnProps, StoreState>(
  mapStateToProps,
  mapDispatchToProps
)(RecentPostCards);
