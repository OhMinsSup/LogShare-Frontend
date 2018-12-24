import * as React from 'react';
import * as classNames from 'classnames/bind';
import { MdTrendingUp, MdAccessTime, MdHome, MdPerson } from 'react-icons/md';
import { Link } from 'react-router-dom';

const styles = require('./CommonMenu.scss');
const cx = classNames.bind(styles);

const CommonMenuItem: React.StatelessComponent<{
  text: string;
  to: string;
  icon: React.ReactNode;
  onClick(): void;
}> = ({ text, icon, to, onClick }) => (
  <Link to={to} className={cx('action-nav')} onClick={onClick}>
    {icon}
    <span>{text}</span>
  </Link>
);

const CommonMenu: React.StatelessComponent<{
  visible: string;
  resize: boolean;
  onClick(): void;
}> = ({ visible, onClick, resize }) => {
  return (
    <div className={cx('common-menu', visible, resize ? 'resize' : 'disize')}>
      <CommonMenuItem to="/" icon={<MdHome />} text="홈" onClick={onClick} />
      <CommonMenuItem
        to="/recent"
        icon={<MdAccessTime />}
        text="최신"
        onClick={onClick}
      />
      <CommonMenuItem
        to="/trending"
        icon={<MdTrendingUp />}
        text="인기"
        onClick={onClick}
      />
      <CommonMenuItem
        to="/users"
        icon={<MdPerson />}
        text="유저"
        onClick={onClick}
      />
    </div>
  );
};
export default CommonMenu;
