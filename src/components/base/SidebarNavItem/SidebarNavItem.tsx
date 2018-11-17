import * as React from 'react';
import * as classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const styles = require('./SidebarNavItem.scss');
const cx = classNames.bind(styles);

const SidebarNavItem: React.StatelessComponent<{
  text: string;
  to: string;
  icon: React.ReactNode;
  active?: boolean;
}> = ({ active, to, text, icon }) => (
  <li className={cx('nav-item', { active })}>
    <Link to={to}>
      {icon}
      <div className={cx('text')}>{text}</div>
    </Link>
  </li>
);

SidebarNavItem.defaultProps = {
  to: '',
  active: false,
};

export default SidebarNavItem;
