import * as React from 'react';
import * as classNames from 'classnames/bind';

const styles = require('./PostTemplate.scss');
const cx = classNames.bind(styles);

const PostTemplate: React.StatelessComponent<{
  children: React.ReactNode;
  header: React.ReactNode;
}> = ({ children, header }) => (
  <div className={cx('post-template')}>
    <div className={cx('header-area')}>{header}</div>
    <div className={cx('post-area')}>{children}</div>
  </div>
);

export default PostTemplate;
