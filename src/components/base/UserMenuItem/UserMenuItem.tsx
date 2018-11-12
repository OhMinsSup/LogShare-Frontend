import * as React from 'react';
import * as classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const styles = require('./UserMenuItem.scss');
const cx = classNames.bind(styles);

const UserMenuItem: React.StatelessComponent<{
  to?: string;
  children: React.ReactNode;
  onClick?(): void;
}> = ({ to, children, onClick }) => {
  if (!to) {
    return (
      <div className={cx('user-menu-item')} onClick={onClick}>
        {children}
      </div>
    );
  }

  return (
    <Link className={cx('user-menu-item')} to={to}>
      {children}
    </Link>
  );
};

export default UserMenuItem;
