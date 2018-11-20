import * as React from 'react';
import * as classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const styles = require('./PostHead.scss');
const cx = classNames.bind(styles);

const PostHead = () => (
  <div className={cx('post-head')}>
    <div className={cx('user-info')}>
      <Link to="veloss" className={cx('user-thumbnail')}>
        <img
          src="https://avatars0.githubusercontent.com/u/17202261?v=4"
          alt="user-thumbnail"
        />
      </Link>
      <div className={cx('info')}>
        <Link to="veloss" className={cx('username')}>
          @veloss
        </Link>
        <div className={cx('description')}>
          Frontend Engineer at Laftel Inc.
        </div>
      </div>
    </div>
    <h1>제목</h1>
    <div className={cx('date-and-likes')}>
      <div className={cx('date')}>Mar 30</div>
      <div className={cx('placeholder')} />
      {/*<PostLikeButton onClick={onToggleLike} liked={liked} likes={likes} disabled={!logged} />*/}
    </div>
    <div className={cx('separator')} />
    {/*ownPost && <PostActionButtons id={id} onAskRemove={onAskRemove} />*/}
  </div>
);

export default PostHead;
