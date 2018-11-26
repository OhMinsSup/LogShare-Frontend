import * as React from 'react';
import * as classNames from 'classnames/bind';
import PostComment from '../PostComment/PostComment';
import { CommentDataState, SubCommentState } from 'src/store/modules/post';

const styles = require('./PostComments.scss');
const cx = classNames.bind(styles);

const PostComments: React.StatelessComponent<{
  logged: boolean;
  commentInput: React.ReactNode;
  postId: string;
  username: string | null;
  comments: CommentDataState[] | null;
  commentCount: number;
  subComments: SubCommentState | {};
  onReadReplices(
    commentId: string,
    postId: string,
    parentId: string | null
  ): any;
  onReply(text: string, reply: string | null): void;
  onOpenRemove(commentId: string, reply: string | null): void;
  onEditComment(commentId: string, reply: string | null, text: string): void;
}> = ({
  commentInput,
  onOpenRemove,
  logged,
  username,
  commentCount,
  comments,
  postId,
  subComments,
  onEditComment,
  onReadReplices,
  onReply,
}) => {
  return (
    <div className={cx('post-comments')}>
      <h3>{commentCount}개의 댓글</h3>
      <div className={cx('comment-input')}>{commentInput}</div>
      <div className={cx('comment-list')}>
        {comments &&
          comments.map((comment, index) => {
            return (
              <PostComment
                key={index}
                visible={comment.visible}
                postId={postId}
                logged={logged}
                currentUsername={username}
                onOpenRemove={onOpenRemove}
                comment={comment.text}
                commentId={comment._id}
                replyId={comment.reply}
                replies={subComments[comment._id]}
                date={comment.createdAt}
                subComments={subComments}
                onEditComment={onEditComment}
                onReply={onReply}
                onReadReplices={onReadReplices}
                username={comment.user.profile.username}
                thumbnail={comment.user.profile.thumbnail}
              />
            );
          })}
      </div>
    </div>
  );
};

export default PostComments;
