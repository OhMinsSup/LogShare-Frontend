import * as React from 'react';
import PostHead from 'src/components/post/PostHead';
import PostContent from 'src/components/post/PostContent';
import PostTags from 'src/components/post/PostTags';
import PostLeftSticker from 'src/components/post/PostLeftSticker';
import { connect } from 'react-redux';
import { StoreState } from 'src/store/modules';
import { Dispatch, bindActionCreators } from 'redux';
import { postCreators } from 'src/store/modules/post';
import { Location } from 'history';
import { match } from 'react-router';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type OwnProps = { location: Location; match: match<{ id: string }> };
type Props = StateProps & DispatchProps & OwnProps;

class PostViewer extends React.Component<Props> {
  public onToggleLike = () => {
    const { post, PostActions } = this.props;
    if (!post) return;
    if (post.liked) {
      PostActions.unlike({ postId: post.postId });
    } else {
      PostActions.like({ postId: post.postId });
    }
  };

  public initialize = () => {
    if (document.body && document.body.scrollTop) {
      document.body.scrollTop = 0;
    }
    if (document.documentElement) {
      document.documentElement.scrollTop = 0;
    }

    const {
      match: {
        params: { id },
      },
      PostActions,
    } = this.props;
    if (!id) return;
    PostActions.readPost({ postId: id });
    PostActions.postSequences({ postId: id });
  };

  public componentDidUpdate(prevProps: Props) {
    if (prevProps.match.url !== this.props.match.url) {
      this.initialize();
    }
  }

  public componentDidMount() {
    this.initialize();
  }

  public render() {
    const {
      post,
      logged,
      currentUsername,
      match: { url },
    } = this.props;
    const { onToggleLike } = this;
    if (!post) return null;

    return (
      <React.Fragment>
        <PostLeftSticker
          likes={post.info.likes}
          liked={post.liked}
          onToggleLike={onToggleLike}
          logged={logged}
          url={url}
          title={post.title}
        />
        <PostHead
          thumbnail={post.user.thumbnail}
          username={post.user.username}
          shortBio={post.user.shortBio}
          createdAt={post.createdAt}
          title={post.title}
          liked={post.liked}
          likes={post.info.likes}
          logged={logged}
          id={post.postId}
          onToggleLike={onToggleLike}
          ownPost={currentUsername === post.user.username}
        />
        <PostContent body={post.body} post_thumbnail={post.post_thumbnail} />
        <PostTags tags={post.tag} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ post, user }: StoreState) => ({
  post: post.postData,
  logged: !!user.user,
  currentUsername: user.user && user.user.username,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  PostActions: bindActionCreators(postCreators, dispatch),
});

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(PostViewer);
