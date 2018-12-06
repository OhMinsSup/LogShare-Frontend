import * as React from 'react';
import * as classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const styles = require('./VideoTemplate.scss');
const cx = classNames.bind(styles);

const VideoTemplate: React.StatelessComponent<{
  children: React.ReactNode;
  mainHead: React.ReactNode;
  mainSidebar: React.ReactNode;
}> = ({ mainSidebar, mainHead, children }) => (
  <div className={cx('video-template')}>
    <div className={cx('video-sidebar')}>{mainSidebar}</div>
    <div className={cx('feed-area')}>
      <div className={cx('mobile-head')}>
        <Link to="/" className={cx('logo')}>
          <span>LogShare</span>
        </Link>
      </div>
      <header className={cx('video-head')}>{mainHead}</header>
      <main className={cx('feed-filter')}>{children}</main>
    </div>
  </div>
);

export default VideoTemplate;
