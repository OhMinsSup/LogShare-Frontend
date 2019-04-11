import * as React from 'react';
import * as classNames from 'classnames/bind';
import { MdLabel } from 'react-icons/md';
import { FaHeart, FaCommentAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { FeedsPostData } from 'src/store/modules/list/feeds';

const styles = require('./FeedPosts.scss');
const cx = classNames.bind(styles);

const FeedPosts: React.StatelessComponent<{
  post: FeedsPostData[];
}> = ({ post }) => (
  <div className={cx('feed-posts')}>
    <div className={cx('header')}>
      <div className={cx('wrapper')}>
        <div className={cx('left-item')}>
          <MdLabel />
          <span>추천 포스트</span>
        </div>
      </div>
    </div>
    <ul className={cx('contents')}>
      {post.map((p, i) => {
        return (
          <li className={cx('post')} key={i}>
            {p.post_thumbnail && (
              <Link
                to={`/post/${p.postId}`}
                className={cx('post-thumbnail')}
                style={{ backgroundImage: `url(${p.post_thumbnail})` }}
              />
            )}
            <Link to={`/post/${p.postId}`} className={cx('title')}>
              {p.title}
            </Link>
            <Link to={`/post/${p.postId}`} className={cx('post-meta')}>
              <span className={cx('item-wrapper')}>
                <FaHeart style={{ color: '#fa5252' }} />
                <span>{p.info.likes}</span>
              </span>
              <span className={cx('item-wrapper')}>
                <FaCommentAlt style={{ color: '#fab005' }} />
                <span>{p.info.comments}</span>
              </span>
            </Link>
            <div className={cx('tags')}>
              {p.tags.map((t, i) => (
                <Link key={i} to={`/tags/${t}`}>
                  {t}
                </Link>
              ))}
            </div>
          </li>
        );
      })}
    </ul>
  </div>
);

export default FeedPosts;
