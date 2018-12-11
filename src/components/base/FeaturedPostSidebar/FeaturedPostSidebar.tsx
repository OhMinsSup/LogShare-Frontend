import * as React from 'react';
import * as classNames from 'classnames/bind';
import { MdLabel } from 'react-icons/md';
import { Link } from 'react-router-dom';

const styles = require('./FeaturedPostSidebar.scss');
const cx = classNames.bind(styles);

const FeaturedPostSidebar: React.StatelessComponent<{
  post?: any[];
}> = ({ post }) => (
  <div className={cx('featured-post-sidebar')}>
    <div className={cx('header')}>
      <div className={cx('wrapper')}>
        <div className={cx('left-item')}>
          <MdLabel />
          <span>추천 포스트</span>
        </div>
        <div className={cx('right-item')}>
          <span>더보기</span>
        </div>
      </div>
    </div>
    <div className={cx('contents')}>
      {post &&
        post.map((post, index) => {
          return (
            <Link to="/" className={cx('post')} key={index}>
              <h2>{post.title}</h2>
              <div className={cx('info')}>
                <span>{post.comments}개의 댓글</span>
                <span>{post.likes}개의 좋아요</span>
              </div>
            </Link>
          );
        })}
    </div>
  </div>
);

FeaturedPostSidebar.defaultProps = {
  post: [
    {
      title: '어떤걸 만들어야 할까?',
      likes: 5,
      comments: 5,
    },
    {
      title: '어떤걸 만들어야 할까?',
      likes: 5,
      comments: 5,
    },
    {
      title: '어떤걸 만들어야 할까?',
      likes: 5,
      comments: 5,
    },
    {
      title: '어떤걸 만들어야 할까?',
      likes: 5,
      comments: 5,
    },
    {
      title: '어떤걸 만들어야 할까?',
      likes: 5,
      comments: 5,
    },
  ],
};

export default FeaturedPostSidebar;
