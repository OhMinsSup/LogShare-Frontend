import * as React from 'react';
import * as classNames from 'classnames/bind';

const styles = require('./LandingTemplate.scss');
const cx = classNames.bind(styles);

const LandingTemplate: React.StatelessComponent<{
  children: React.ReactNode;
  mainHead: React.ReactNode;
  mainSidebar: React.ReactNode;
  primarySidebar: React.ReactNode;
}> = ({ mainSidebar, mainHead, primarySidebar, children }) => (
  <div className={cx('landing-template')}>
    <div className={cx('landing-sidebar')}>
      <div className={cx('sidebar-content')}>{mainSidebar}</div>
    </div>
    <div className={cx('shadow-sidebar')} />
    <div className={cx('feed-area')}>
      <header className={cx('landing-head')}>{mainHead}</header>
      <main>{children}</main>
    </div>
    <aside className={cx('primary-sidebar')}>{primarySidebar}</aside>
  </div>
);

export default LandingTemplate;
