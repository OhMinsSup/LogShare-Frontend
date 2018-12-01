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
import QuestionModal from 'src/components/common/QuestionModal';
import FakePost from 'src/components/common/FakePost';
import { authCreators } from 'src/store/modules/auth';
import { noticeCreators } from 'src/store/modules/notice';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type OwnProps = { location: Location; match: match<{ id: string }> };
type Props = StateProps & DispatchProps & OwnProps;

class PostViewer extends React.Component<Props> {
  public onToggleLike = () => {
    const { post, PostActions, NoticeActions, currentUsername } = this.props;

    if (!post) return;

    if (post.liked) {
      PostActions.unlike({ postId: post.postId });
      NoticeActions.sendMessage({
        message: `${
          post.user.username
        }님이 작성하신 포스트에 ${currentUsername}님이 unlike를 하였습니다.`,
      });
    } else {
      PostActions.like({ postId: post.postId });
      NoticeActions.sendMessage({
        message: `${
          post.user.username
        }님이 작성하신 포스트에 ${currentUsername}님이 like를 하였습니다.`,
      });
    }
  };

  public onAskRemove = () => {
    const { PostActions, askModal } = this.props;
    if (askModal) {
      PostActions.setModal(false);
    } else {
      PostActions.setModal(true);
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
      AuthActions,
    } = this.props;

    AuthActions.setNextUrl(true);

    if (!id) return;

    PostActions.readPost({ postId: id });
    PostActions.postSequences({ postId: id });
  };

  public onConfirm = () => {
    const {
      match: {
        params: { id },
      },
      PostActions,
    } = this.props;
    PostActions.setModal(false);
    PostActions.deletePost({ postId: id });
  };

  public componentDidUpdate(prevProps: Props) {
    if (
      prevProps.match.url !== this.props.match.url ||
      prevProps.match.params.id !== this.props.match.params.id
    ) {
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
      askModal,
    } = this.props;

    const { onToggleLike, onAskRemove, onConfirm } = this;

    if (!post) return <FakePost />;

    return (
      <React.Fragment>
        <PostLeftSticker
          likes={post.info.likes}
          liked={post.liked}
          title={post.title}
          onToggleLike={onToggleLike}
          logged={logged}
          url={url}
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
          onAskRemove={onAskRemove}
          ownPost={currentUsername === post.user.username}
        />
        <PostContent body={post.body} post_thumbnail={post.post_thumbnail} />
        <PostTags tags={post.tag} />
        <QuestionModal
          open={askModal}
          title="포스트 삭제"
          description="이 포스트를 정말로 삭제하시겠습니까?"
          confirmText="삭제"
          onConfirm={onConfirm}
          onCancel={onAskRemove}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ post, user }: StoreState) => ({
  post: post.postData,
  askModal: post.askModal,
  logged: !!user.user,
  currentUsername: user.user && user.user.username,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  PostActions: bindActionCreators(postCreators, dispatch),
  AuthActions: bindActionCreators(authCreators, dispatch),
  NoticeActions: bindActionCreators(noticeCreators, dispatch),
});

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(PostViewer);
