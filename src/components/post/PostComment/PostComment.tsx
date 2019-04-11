import * as React from 'react';
import * as classNames from 'classnames/bind';
import * as moment from 'moment';
import PostCommentInput from '../PostCommentInput';
import { Link } from 'react-router-dom';
import { FaPlusSquare, FaMinusSquare } from 'react-icons/fa';
import { CommentDataState, SubCommentState } from 'src/store/modules/post';
import defaultThumbnail from '../../../static/default.jpg';

const styles = require('./PostComment.scss');
const cx = classNames.bind(styles);

type Props = {
  commentId: string;
  replyId: string | null;
  date: string;
  logged: boolean;
  subComments: SubCommentState | {};
  currentUsername: string | null;
  thumbnail: string;
  visible: boolean;
  username: string;
  postId: string;
  comment: string;
  level: number;
  replies?: CommentDataState[];
  onReadReplices(
    commentId: string,
    postId: string,
    parentId: string | null
  ): any;
  onReply(text: string, reply: string | null): void;
  onOpenRemove(commentId: string, reply: string | null): void;
  onEditComment(commentId: string, reply: string | null, text: string): void;
};

type State = {
  open: boolean;
  showInput: boolean;
  editing: boolean;
};

class PostComment extends React.Component<Props, State> {
  public static defaultProps = {
    level: 0,
  };

  public state: State = {
    open: false,
    showInput: false,
    editing: false,
  };

  public onOpen = () => {
    this.readReplies();
    this.setState({
      open: true,
      showInput: false,
    });
  };

  public onClose = () => {
    this.setState({
      open: false,
    });
  };

  public onShowInput = () => {
    this.setState({
      showInput: true,
    });
  };

  public onHideInput = () => {
    this.setState({
      showInput: false,
    });
  };

  public onToggleEdit = () => {
    this.setState({
      editing: !this.state.editing,
    });
  };

  public readReplies = () => {
    const { onReadReplices, commentId, postId, replyId } = this.props;
    onReadReplices(commentId, postId, replyId);
  };

  public shouldComponentUpdate(nextProps: Props, nextState: State) {
    const compare = (key: string) => {
      return nextProps[key] !== this.props[key];
    };

    return (
      this.state !== nextState ||
      compare('replies') ||
      compare('comment') ||
      compare('subComments')
    );
  }

  public onOpenRemove = () => {
    const { onOpenRemove, commentId, replyId } = this.props;
    onOpenRemove(commentId, replyId);
  };

  public onConfirmEdit = (text: string) => {
    const { onEditComment, commentId, replyId } = this.props;

    onEditComment(commentId, replyId, text);

    this.setState({
      editing: false,
    });
  };

  public onReply = (text: string, reply: string | null) => {
    const { onReply } = this.props;
    return onReply(text, reply);
  };

  public render() {
    const {
      username,
      comment,
      currentUsername,
      date,
      commentId,
      level,
      subComments,
      visible,
      logged,
      replies,
      thumbnail,
      postId,
      onOpenRemove,
      onReadReplices,
      onEditComment,
    } = this.props;
    const { editing, showInput, open } = this.state;
    return (
      <div className={cx('post-comment')}>
        {editing ? (
          <PostCommentInput
            editing={editing}
            reply={null}
            onCancel={this.onToggleEdit}
            onWriteComment={this.onConfirmEdit}
            defaultValue={comment || ''}
          />
        ) : (
          <React.Fragment>
            <div className={cx('comment-head')}>
              <Link to={`/@${username}`}>
                <img src={thumbnail || defaultThumbnail} alt={username} />
              </Link>
              <div className={cx('text-block')}>
                {username === null ? (
                  <div className={cx('username', 'unknown')}>알 수 없음</div>
                ) : (
                  <Link to={`/@${username}`}>{username}</Link>
                )}
                <div className={cx('date')}>{moment(date).format('LLL')}</div>
              </div>
              {username && username === currentUsername && (
                <div className={cx('actions')}>
                  <button className={cx('edit')} onClick={this.onToggleEdit}>
                    {visible ? '' : '수정'}
                  </button>
                  <button className={cx('remove')} onClick={this.onOpenRemove}>
                    {visible ? '' : '삭제'}
                  </button>
                </div>
              )}
            </div>
            <div
              className={cx('comment-body', {
                deleted: visible,
              })}
            >
              {visible ? '삭제된 댓글' : comment}
            </div>
          </React.Fragment>
        )}
        {level < 1 &&
          (open ? (
            <button className={cx('replies-button')} onClick={this.onClose}>
              <FaMinusSquare />
              숨기기
            </button>
          ) : (
            logged &&
            (comment && (
              <button className={cx('replies-button')} onClick={this.onOpen}>
                <FaPlusSquare />
                답글 달기
              </button>
            ))
          ))}
        {open && (
          <section className={cx('replies')}>
            {replies &&
              replies.map((reply, index) => {
                return (
                  <PostComment
                    key={index}
                    logged={logged}
                    visible={reply.visible}
                    currentUsername={username}
                    comment={reply.text}
                    commentId={reply._id}
                    replyId={reply.reply}
                    subComments={subComments}
                    username={reply.user.username}
                    thumbnail={reply.user.thumbnail}
                    date={reply.createdAt}
                    postId={postId}
                    onReply={this.onReply}
                    level={level + 1}
                    onEditComment={onEditComment}
                    onReadReplices={onReadReplices}
                    onOpenRemove={onOpenRemove}
                  />
                );
              })}
            {showInput ? (
              <PostCommentInput
                showCancel
                onCancel={this.onHideInput}
                onWriteComment={this.onReply}
                reply={commentId}
              />
            ) : (
              logged && (
                <button
                  className={cx('show-input-button')}
                  onClick={this.onShowInput}
                >
                  답글 작성하기
                </button>
              )
            )}
          </section>
        )}
      </div>
    );
  }
}

export default PostComment;
