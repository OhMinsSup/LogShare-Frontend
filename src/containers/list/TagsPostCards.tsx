import * as React from 'react';
import PostCardList from 'src/components/common/PostCardList';
import { connect } from 'react-redux';
import { throttle } from 'lodash';
import { Dispatch, bindActionCreators } from 'redux';
import { StoreState } from 'src/store/modules';
import { getScrollBottom } from 'src/lib/common';
import FakePostCards from 'src/components/common/FakePostCards';
import { tagsCreators } from 'src/store/modules/list/tags';
import { authCreators } from 'src/store/modules/auth';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type OwnProps = { tag: string };
type Props = StateProps & DispatchProps & OwnProps;

class TagsPostCards extends React.Component<Props> {
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
      ListActions.revealTagsPostsPrefetched();
    }

    if (next === this.prev) return;
    this.prev = next;

    ListActions.prefetchTagsPosts({ next });
  };

  public initialize = () => {
    const { ListActions, tag, AuthActions } = this.props;
    AuthActions.setNextUrl(false);
    ListActions.getTagsPosts({ tag });
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

  public componentDidUpdate(preProps: Props) {
    if (preProps.tag != this.props.tag) {
      this.initialize();
    }
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
  posts: list.tags.tags_posts.post,
  prefetched: list.tags.tags_posts.prefetched,
  next: list.tags.tags_posts.next,
  loading: list.tags.tags_posts.loading,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  ListActions: bindActionCreators(tagsCreators, dispatch),
  AuthActions: bindActionCreators(authCreators, dispatch),
});

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(TagsPostCards);
