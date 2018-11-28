import * as React from 'react';
import * as classNames from 'classnames/bind';
import Button from 'src/components/common/Button';
import { Link } from 'react-router-dom';
import { MdSearch, MdNotificationsNone, MdMenu } from 'react-icons/md';
import { UserSubState } from 'src/store/modules/user';
import defaultThumbnail from '../../../static/default.jpg';

const styles = require('./Header.scss');
const cx = classNames.bind(styles);

const Header: React.StatelessComponent<{
  commonMenu: React.ReactNode;
  user: UserSubState | null;
  menu: React.ReactNode;
  onSideBar(): void;
  onMenu(): void;
}> = ({ user, menu, onMenu, onSideBar, commonMenu }) => (
  <div className={cx('header')}>
    <div className={cx('left-items')}>
      <button className={cx('menu')} onClick={onSideBar}>
        <MdMenu />
      </button>
      {commonMenu}
      {user ? (
        <Link to="/write" className={cx('write')}>
          작성하기
        </Link>
      ) : null}
      <Link to="/search" className={cx('search')}>
        <MdSearch />
      </Link>
      <Link
        to={user ? `/notice/@${user.username}` : '/auth/login'}
        className={cx('notice')}
      >
        <MdNotificationsNone />
      </Link>
    </div>
    <div className={cx('right-items')}>
      {user ? (
        <Button className={cx('users')} theme="noline" onClick={onMenu}>
          <img
            className={cx('thumbnail')}
            src={user.thumbnail || defaultThumbnail}
            alt={user.username}
          />
          <span className={cx('username')}>{user.username}</span>
        </Button>
      ) : (
        <Button to="/auth/login" theme="default">
          로그인 / 회원가입
        </Button>
      )}
      {menu}
    </div>
  </div>
);

export default Header;
