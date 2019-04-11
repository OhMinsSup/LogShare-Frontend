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
            <UserMenuItem to={`/@${username}`}>내 블로그</UserMenuItem>
            <div className={cx('separator')} />
            <UserMenuItem to="/write">포스트 작성</UserMenuItem>
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
