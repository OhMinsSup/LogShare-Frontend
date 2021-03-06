import * as React from 'react';
import * as classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const styles = require('./CommonTemplate.scss');
const cx = classNames.bind(styles);

const CommonTemplate: React.StatelessComponent<{
  children: React.ReactNode;
  mainHead: React.ReactNode;
  mainSidebar: React.ReactNode;
  primarySidebar: React.ReactNode;
}> = ({ mainSidebar, mainHead, primarySidebar, children }) => (
  <div className={cx('common-template')}>
    <div className={cx('common-sidebar')}>{mainSidebar}</div>
    <div className={cx('shadow-sidebar')} />
    <div className={cx('feed-area')}>
      <div className={cx('mobile-head')}>
        <Link to="/" className={cx('logo')}>
          <span>LogShare</span>
        </Link>
      </div>
      <header className={cx('common-head')}>{mainHead}</header>
      <main className={cx('feed-filter')}>{children}</main>
    </div>
    <aside className={cx('primary-sidebar')}>{primarySidebar}</aside>
  </div>
);

export default CommonTemplate;
