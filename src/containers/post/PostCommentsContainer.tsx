import * as React from 'react';
import { StoreState } from 'src/store/modules';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PostComments from 'src/components/post/PostComments';
import PostCommentInput from 'src/components/post/PostCommentInput';
import { postCreators } from 'src/store/modules/post';
import QuestionModal from 'src/components/common/QuestionModal';
import { match } from 'react-router';
import { noticeCreators } from 'src/store/modules/notice';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type OwnProps = { match: match<{ id: string }> };
type Props = StateProps & DispatchProps & OwnProps;

class PostCommentsContainer extends React.Component<Props> {
  public onOpenRemove = (commentId: string, reply: string | null) => {
    const { PostActions } = this.props;
    PostActions.openCommentRemove({ commentId, reply });
  };

  public onCancelRemove = () => {
    const { PostActions } = this.props;
    PostActions.cancelCommentRemove();
  };

  public onConfirmRemove = () => {
    const { PostActions, postId, removeComment } = this.props;
    if (!postId || !removeComment.commentId) return;

    PostActions.deleteComment({ postId, commentId: removeComment.commentId });
  };

  public onReadReplices = (
    commentId: string,
    postId: string,
    parentId: string | null
  ) => {
    const { PostActions } = this.props;

    PostActions.readSubcomments({ commentId, postId, parentId });
  };

  public onEditComment = (
    commentId: string,
    reply: string | null,
    text: string
  ) => {
    const { postId, PostActions } = this.props;
    if (!postId) return;
    PostActions.editComment({ postId, commentId, text });
  };

  public onWriteComment = (text: string, reply: string | null) => {
    const {
      postId,
      PostActions,
      NoticeActions,
      postUsername,
      currentUsername,
    } = this.props;
    if (!postId) return;

    PostActions.writeComment({ text, reply, postId });
    NoticeActions.sendMessage({
      message: `${postUsername}님이 작성하신 포스트에 ${currentUsername}님이 댓글을 작성 하였습니다.`,
    });
  };

  public initialize = () => {
    const {
      match: {
        params: { id },
      },
      PostActions,
    } = this.props;

    PostActions.readComments({ postId: id });
  };

  public componentDidMount() {
    this.initialize();
  }

  public componentDidUpdate(preProps: Props) {
    if (preProps.askComment !== this.props.askComment) {
      this.initialize();
    }
  }

  public render() {
    const {
      logged,
      username,
      removeComment,
      subComments,
      postId,
      commentCount,
      comments,
    } = this.props;

    return (
      <React.Fragment>
        <PostComments
          commentInput={
            logged && (
              <PostCommentInput
                reply={null}
                onWriteComment={this.onWriteComment}
              />
            )
          }
          subComments={subComments}
          postId={postId as string}
          comments={comments}
          logged={logged}
          onReply={this.onWriteComment}
          username={username}
          onReadReplices={this.onReadReplices}
          onOpenRemove={this.onOpenRemove}
          onEditComment={this.onEditComment}
          commentCount={commentCount || 0}
        />
        <QuestionModal
          title="댓글 삭제"
          description="이 댓글을 정말로 삭제하시겠습니다?"
          confirmText="삭제"
          onConfirm={this.onConfirmRemove}
          onCancel={this.onCancelRemove}
          open={removeComment.visible}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ user, post }: StoreState) => ({
  logged: !!user.user,
  askComment: post.askComment,
  postUsername: post.postData && post.postData.user.username,
  currentUsername: user.user && user.user.username,
  postId: post.postData && post.postData.postId,
  username: user.user && user.user.username,
  removeComment: post.removeComment,
  subComments: post.subComment,
  comments: post.comments,
  commentCount: post.postData && post.postData.info.comments,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  PostActions: bindActionCreators(postCreators, dispatch),
  NoticeActions: bindActionCreators(noticeCreators, dispatch),
});

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(PostCommentsContainer);
