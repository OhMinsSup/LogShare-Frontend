import * as React from 'react';
import * as classNames from 'classnames/bind';
import Button from 'src/components/common/Button';
import { Link } from 'react-router-dom';
import { MdSearch, MdNotificationsNone, MdMenu } from 'react-icons/md';
import { UserSubState } from 'src/store/modules/user';

const styles = require('./Header.scss');
const cx = classNames.bind(styles);

const Header: React.StatelessComponent<{
  user: UserSubState | null;
}> = ({ user }) => (
  <div className={cx('header')}>
    <div className={cx('left-items')}>
      <button className={cx('menu')}>
        <MdMenu />
      </button>
      {user ? (
        <Link to="/write" className={cx('write')}>
          작성하기
        </Link>
      ) : null}
      <Link to="/search" className={cx('search')}>
        <MdSearch />
      </Link>
      <Link to={user ? '/notice' : '/auth/login'} className={cx('notice')}>
        <MdNotificationsNone />
      </Link>
    </div>
    <div className={cx('right-items')}>
      {user ? (
        <Button className={cx('users')} theme="noline">
          <img
            className={cx('thumbnail')}
            src={user.profile.thumbnail}
            alt={user.profile.username}
          />
          <span className={cx('username')}>{user.profile.username}</span>
        </Button>
      ) : (
        <Button to="/auth/login" theme="default">
          로그인 / 회원가입
        </Button>
      )}
    </div>
  </div>
);

export default Header;
