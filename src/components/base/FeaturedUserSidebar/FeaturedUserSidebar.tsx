import * as React from 'react';
import * as classNames from 'classnames/bind';
import { MdLabel } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { FeaturedUsersSubState } from 'src/store/modules/list/featured';

const styles = require('./FeaturedUserSidebar.scss');
const cx = classNames.bind(styles);

const FeaturedUserSidebar: React.StatelessComponent<{
  user: FeaturedUsersSubState[];
}> = ({ user }) => (
  <div className={cx('featured-user-sidebar')}>
    <div className={cx('header')}>
      <div className={cx('wrapper')}>
        <div className={cx('left-item')}>
          <MdLabel />
          <span>추천 유저</span>
        </div>
      </div>
    </div>
    <div className={cx('contents')}>
      {user &&
        user.map((user, index) => {
          return (
            <Link
              to={`/@${user.profile.username}`}
              className={cx('user')}
              key={index}
            >
              <div className={cx('thumbnail-wrapper')}>
                <img src={user.profile.thumbnail} />
              </div>
              <div className={cx('username-wrapper')}>
                <strong>{user.profile.username}</strong>
                <span>{user.profile.shortBio}</span>
              </div>
            </Link>
          );
        })}
    </div>
  </div>
);

export default FeaturedUserSidebar;
