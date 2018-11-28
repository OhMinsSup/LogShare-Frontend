import * as React from 'react';
import * as classNames from 'classnames/bind';
import {
  MdTrendingUp,
  MdAccessTime,
  MdContentCopy,
  MdHome,
} from 'react-icons/md';
import { Link } from 'react-router-dom';

const styles = require('./CommonMenu.scss');
const cx = classNames.bind(styles);

const CommonMenuItem: React.StatelessComponent<{
  text: string;
  to: string;
  icon: React.ReactNode;
}> = ({ text, icon, to }) => (
  <Link to={to} className={cx('action-nav')}>
    {icon}
    <span>{text}</span>
  </Link>
);

const CommonMenu: React.StatelessComponent<{
  visible: string;
}> = ({ visible }) => {
  return (
    <div className={cx('common-menu', visible)}>
      <CommonMenuItem to="/" icon={<MdHome />} text="홈" />
      <CommonMenuItem to="/recent" icon={<MdAccessTime />} text="최신" />
      <CommonMenuItem to="/trending" icon={<MdTrendingUp />} text="인기" />
      <CommonMenuItem to="seris" icon={<MdContentCopy />} text="시리즈" />
    </div>
  );
};
export default CommonMenu;
