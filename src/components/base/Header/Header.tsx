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
  notice: React.ReactNode;
  menu: React.ReactNode;
  width: number;
  path: string;
  onCommonMenur(): void;
  onNotice(): void;
  onMenu(): void;
}> = ({
  user,
  menu,
  onMenu,
  onCommonMenur,
  commonMenu,
  width,
  path,
  notice,
  onNotice,
}) => (
  <div className={cx('header')}>
    <div className={cx('left-items')}>
      {width > 885 ? null : (
        <button className={cx('menu')} onClick={onCommonMenur}>
          <MdMenu />
        </button>
      )}
      {path === '/post/:id' ? (
        <React.Fragment>
          {width <= 885 ? null : (
            <button className={cx('menu')} onClick={onCommonMenur}>
              <MdMenu />
            </button>
          )}
        </React.Fragment>
      ) : null}
      {commonMenu}
      {user ? (
        <Link to="/write" className={cx('write')}>
          작성하기
        </Link>
      ) : null}
      {user ? (
        <button className={cx('notice')} onClick={onNotice}>
          <MdNotificationsNone />
        </button>
      ) : null}

      <Link to="/search" className={cx('search')}>
        <MdSearch />
      </Link>
      {notice}
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
