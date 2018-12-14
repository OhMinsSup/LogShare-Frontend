import * as React from 'react';
import * as classNames from 'classnames/bind';
import { MdLabel } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { FeaturedPostsSubState } from 'src/store/modules/list/featured';

const styles = require('./FeaturedPostSidebar.scss');
const cx = classNames.bind(styles);

const FeaturedPostSidebar: React.StatelessComponent<{
  post: FeaturedPostsSubState[];
}> = ({ post }) => (
  <div className={cx('featured-post-sidebar')}>
    <div className={cx('header')}>
      <div className={cx('wrapper')}>
        <div className={cx('left-item')}>
          <MdLabel />
          <span>추천 포스트</span>
        </div>
      </div>
    </div>
    <div className={cx('contents')}>
      {post &&
        post.map((post, index) => {
          return (
            <Link to={`/post/${post._id}`} className={cx('post')} key={index}>
              <h2>{post.title}</h2>
              <div className={cx('info')}>
                <span>{post.info.comments}개의 댓글</span>
                <span>{post.info.likes}개의 좋아요</span>
              </div>
            </Link>
          );
        })}
    </div>
  </div>
);

export default FeaturedPostSidebar;
