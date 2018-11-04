import * as React from 'react';
import * as classNames from 'classnames/bind';

const styles = require('./PageTemplate.scss');
const cx = classNames.bind(styles);

const PageTemplate: React.StatelessComponent<{
  children: React.ReactNode;
}> = ({ children }) => <div className={cx('page-template')}>{children}</div>;

export default PageTemplate;
