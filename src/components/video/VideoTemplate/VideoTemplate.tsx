import * as React from 'react';
import * as classNames from 'classnames/bind';

const styles = require('./VideoTemplate.scss');
const cx = classNames.bind(styles);

const VideoTemplate: React.StatelessComponent<{
  children: React.ReactNode;
  header: React.ReactNode;
}> = ({ header, children }) => {
  return (
    <div className={cx('video-template')}>
      <div className={cx('header-area')}>{header}</div>
      <div className={cx('video-area')}>{children}</div>
    </div>
  );
};

export default VideoTemplate;
