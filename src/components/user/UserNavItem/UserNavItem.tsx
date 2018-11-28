import * as React from 'react';
import * as classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const styles = require('./UserNavItem.scss');
const cx = classNames.bind(styles);

const UserNavItem: React.StatelessComponent<{
  text: string;
  to: string;
  active?: boolean;
}> = ({ text, to, active }) => {
  return (
    <li className={cx('nav-item', { active })}>
      <Link to={to}>
        <div className={cx('text')}>{text}</div>
      </Link>
    </li>
  );
};

UserNavItem.defaultProps = {
  to: '',
  active: false,
};

export default UserNavItem;
