import * as React from 'react';
import * as classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import {
  MdTrendingUp,
  MdAccessTime,
  MdPerson,
  MdRssFeed,
} from 'react-icons/md';
import SidebarNavItem from '../SidebarNavItem';

const styles = require('./Sidebar.scss');
const cx = classNames.bind(styles);

const Sidebar: React.StatelessComponent<{
  url: string;
  onRss(type: 'user' | 'entire'): void;
}> = ({ url, onRss }) => (
  <div className={cx('sidebar')}>
    <div className={cx('sidebar-top')}>
      <div className={cx('logo-section')}>
        <Link to="/" className={cx('logo')}>
          <span>LogShare</span>
        </Link>
      </div>
      <div className={cx('primary')}>
        <ul className={cx('list')}>
          <SidebarNavItem
            text="최신"
            icon={<MdAccessTime />}
            active={url === `/recent`}
            to={`/recent`}
          />
          <SidebarNavItem
            text="인기"
            icon={<MdTrendingUp />}
            active={url === `/trending`}
            to={`/trending`}
          />
          <SidebarNavItem
            text="유저"
            icon={<MdPerson />}
            active={url === `/users`}
            to={`/users`}
          />
        </ul>
      </div>
    </div>
    <div className={cx('sidebar-rss')}>
      <div className={cx('rss')} onClick={() => onRss('entire')}>
        <MdRssFeed className={cx('icon')} />
        <span className={cx('text')}>EntireRSS</span>
      </div>
      <div className={cx('rss')} onClick={() => onRss('user')}>
        <MdRssFeed className={cx('icon')} />
        <span className={cx('text')}>UserRSS</span>
      </div>
    </div>
  </div>
);

export default Sidebar;
