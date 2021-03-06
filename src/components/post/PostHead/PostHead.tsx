import * as React from 'react';
import * as moment from 'moment';
import * as classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import PostLikeButton from '../PostLikeButton';
import PostActionButtons from '../PostActionButtons';
import defaultThumbnail from '../../../static/default.jpg';

const styles = require('./PostHead.scss');
const cx = classNames.bind(styles);

const PostHead: React.StatelessComponent<{
  thumbnail: string;
  username: string;
  shortBio: string;
  createdAt: string;
  title: string;
  liked: boolean;
  likes: number;
  logged: boolean;
  ownPost: boolean;
  id: string;
  onAskRemove(): void;
  onToggleLike(): void;
}> = ({
  id,
  ownPost,
  thumbnail,
  username,
  shortBio,
  createdAt,
  liked,
  likes,
  title,
  logged,
  onToggleLike,
  onAskRemove,
}) => (
  <div className={cx('post-head')}>
    <div className={cx('user-info')}>
      <Link to={`/@${username}`} className={cx('user-thumbnail')}>
        <img src={thumbnail || defaultThumbnail} alt="user-thumbnail" />
      </Link>
      <div className={cx('info')}>
        <Link to={`/@${username}`} className={cx('username')}>
          @{username}
        </Link>
        <div className={cx('description')}>{shortBio}</div>
      </div>
    </div>
    <h1>{title}</h1>
    <div className={cx('date-and-likes')}>
      <div className={cx('date')}>{moment(createdAt).format('LLL')}</div>
      <div className={cx('placeholder')} />
      <PostLikeButton
        onClick={onToggleLike}
        liked={liked}
        likes={likes}
        disabled={logged}
      />
    </div>
    <div className={cx('separator')} />
    {ownPost && <PostActionButtons id={id} onAskRemove={onAskRemove} />}
  </div>
);

export default PostHead;
