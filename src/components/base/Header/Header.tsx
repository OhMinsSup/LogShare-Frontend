import * as React from 'react';
import * as classNames from 'classnames/bind';
import Button from 'src/components/common/Button';
import { Link } from 'react-router-dom';
import { MdSearch, MdNotificationsNone, MdMenu } from 'react-icons/md';

const styles = require('./Header.scss');
const cx = classNames.bind(styles);

const Header: React.StatelessComponent<{}> = () => (
  <div className={cx('header')}>
    <div className={cx('left-items')}>
      <button className={cx('menu')}>
        <MdMenu />
      </button>
      <Link to="/write" className={cx('write')}>
        작성하기
      </Link>
      <Link to="/search" className={cx('search')}>
        <MdSearch />
      </Link>
      <Link to="/notice" className={cx('notice')}>
        <MdNotificationsNone />
      </Link>
    </div>
    <div className={cx('right-items')}>
      <Button className={cx('users')} theme="noline">
        <img
          className={cx('thumbnail')}
          src="https://images.velog.io/thumbnails/veloss/43c665f0-b44c-11e8-b8f5-49cedc880031-DHxDbYmUwAASvCI.png"
          alt="veloss"
        />
        <span className={cx('username')}>veloss</span>
      </Button>
    </div>
  </div>
);

export default Header;
