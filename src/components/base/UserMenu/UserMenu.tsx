import * as React from 'react';
import * as classNames from 'classnames/bind';
import UserMenuItem from '../UserMenuItem';

const styles = require('./UserMenu.scss');
const cx = classNames.bind(styles);

const UserMenu: React.StatelessComponent<{
  username: string | null;
  onLogout(): void;
}> = ({ onLogout, username }) => {
  return (
    <div className={cx('user-menu-wrapper')}>
      <div className={cx('user-menu-positioner')}>
        <div className={cx('rotated-square')} />
        <div className={cx('user-menu')}>
          <div className={cx('menu-items')}>
            <UserMenuItem to={`/@${username}`}>내 페이지</UserMenuItem>
            <div className={cx('separator')} />
            <UserMenuItem to="/write">포스트 작성</UserMenuItem>
            <UserMenuItem to={`/@${username}/posts`}>최신 포스트</UserMenuItem>
            <UserMenuItem to={`/@${username}/likes`}>
              좋아요 포스트
            </UserMenuItem>
            <UserMenuItem to={`/@${username}/follower`}>팔로우</UserMenuItem>
            <UserMenuItem to={`/@${username}/following`}>팔로잉</UserMenuItem>
            <div className={cx('separator')} />
            <UserMenuItem to={`/setting`}>설정</UserMenuItem>
            <UserMenuItem onClick={onLogout}>로그아웃</UserMenuItem>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
