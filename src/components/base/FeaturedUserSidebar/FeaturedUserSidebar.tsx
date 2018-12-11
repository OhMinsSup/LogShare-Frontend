import * as React from 'react';
import * as classNames from 'classnames/bind';
import { MdLabel } from 'react-icons/md';
import { Link } from 'react-router-dom';

const styles = require('./FeaturedUserSidebar.scss');
const cx = classNames.bind(styles);

const FeaturedUserSidebar: React.StatelessComponent<{
  user?: any[];
}> = ({ user }) => (
  <div className={cx('featured-user-sidebar')}>
    <div className={cx('header')}>
      <div className={cx('wrapper')}>
        <div className={cx('left-item')}>
          <MdLabel />
          <span>추천 유저</span>
        </div>
        <div className={cx('right-item')}>
          <span>더보기</span>
        </div>
      </div>
    </div>
    <div className={cx('contents')}>
      {user &&
        user.map((user, index) => {
          return (
            <Link to="/" className={cx('user')} key={index}>
              <div className={cx('thumbnail-wrapper')}>
                <img src={user.thumbnail} />
              </div>
              <div className={cx('username-wrapper')}>
                <strong>{user.username}</strong>
                <span>{user.shortBio}</span>
              </div>
            </Link>
          );
        })}
    </div>
  </div>
);

FeaturedUserSidebar.defaultProps = {
  user: [
    {
      username: 'Veloss',
      shortBio: '개발자 희망생',
      thumbnail:
        'https://pbs.twimg.com/profile_images/816642663982067713/IA8mjnjE_bigger.jpg',
    },
    {
      username: 'Veloss',
      shortBio: '개발자 희망생',
      thumbnail:
        'https://pbs.twimg.com/profile_images/816642663982067713/IA8mjnjE_bigger.jpg',
    },
    {
      username: 'Veloss',
      shortBio: '개발자 희망생',
      thumbnail:
        'https://pbs.twimg.com/profile_images/816642663982067713/IA8mjnjE_bigger.jpg',
    },
    {
      username: 'Veloss',
      shortBio: '개발자 희망생',
      thumbnail:
        'https://pbs.twimg.com/profile_images/816642663982067713/IA8mjnjE_bigger.jpg',
    },
    {
      username: 'Veloss',
      shortBio: '개발자 희망생',
      thumbnail:
        'https://pbs.twimg.com/profile_images/816642663982067713/IA8mjnjE_bigger.jpg',
    },
  ],
};

export default FeaturedUserSidebar;
