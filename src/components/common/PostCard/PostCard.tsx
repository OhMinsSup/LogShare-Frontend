import * as React from 'react';
import * as classNames from 'classnames/bind';
import * as moment from 'moment';
import { Link } from 'react-router-dom';
import { IoMdImage } from 'react-icons/io';
import defaultThumbnail from '../../../static/default.jpg';

const styles = require('./PostCard.scss');
const cx = classNames.bind(styles);

const PostCard: React.SFC<{
  postId: string;
  title: string;
  body: string;
  post_thumbnail: string | null;
  createdAt: string;
  user: {
    username: string;
    thumbnail: string;
    shortBio: string;
    _id: string;
  };
  info: {
    likes: number;
    comments: number;
  };
}> = ({ post_thumbnail, postId, body, title, createdAt, user, info }) => (
  <div className={cx('post-card')}>
    <Link to={`/post/${postId}`} className={cx('thumbnail-wrapper')}>
      {post_thumbnail ? (
        <img src={post_thumbnail} />
      ) : (
        <div className={cx('image-placeholder')}>
          <IoMdImage />
        </div>
      )}
      <div className={cx('white-mask')} />
    </Link>
    <div className={cx('card-content')}>
      <Link to={`/@${user.username}`} className={cx('user-thumbnail-wrapper')}>
        <img src={user.thumbnail || defaultThumbnail} />
      </Link>
      <div className={cx('content-head')}>
        <Link to={`/@${user.username}`} className={cx('username')}>
          @{user.username}
        </Link>
        <h3>
          <Link to={`/post/${postId}`}>{title}</Link>
        </h3>
        <div className={cx('subinfo')}>
          <span>{moment(createdAt).format('LL')}</span>
          <span>{info.comments} 개의 댓글</span>
          <span>{info.likes} 개의 좋아요</span>
        </div>
      </div>
      <div className={cx('description')}>{body}</div>
    </div>
  </div>
);

export default PostCard;
