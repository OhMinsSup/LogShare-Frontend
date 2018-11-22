import * as React from 'react';
import * as classNames from 'classnames/bind';

const styles = require('./PostComments.scss');
const cx = classNames.bind(styles);

const PostComments: React.StatelessComponent<{
  commentInput: React.ReactNode;
}> = ({ commentInput }) => {
  return (
    <div className={cx('post-comments')}>
      <h3>5개의 댓글</h3>
      <div className={cx('comment-input')}>{commentInput}</div>
    </div>
  );
};

export default PostComments;
