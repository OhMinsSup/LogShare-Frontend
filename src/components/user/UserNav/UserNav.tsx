import * as React from 'react';
import * as classNames from 'classnames/bind';
import UserNavItem from '../UserNavItem';

const styles = require('./UserNav.scss');
const cx = classNames.bind(styles);

const UserNav: React.StatelessComponent<{
  url: string;
  username: string;
}> = ({ url, username }) => (
  <div className={cx('user-nav')}>
    <ul className={cx('nav')}>
      <UserNavItem
        to={`/@${username}/posts`}
        text="포스트"
        active={url === `/@${username}/posts`}
      />
      <UserNavItem
        to={`/@${username}/following`}
        text="팔로잉"
        active={url === `/@${username}/following`}
      />
      <UserNavItem
        to={`/@${username}/follower`}
        text="팔로우"
        active={url === `/@${username}/follower`}
      />
      <UserNavItem
        to={`/@${username}/likes`}
        text="좋아요"
        active={url === `/@${username}/likes`}
      />
    </ul>
  </div>
);

export default UserNav;
