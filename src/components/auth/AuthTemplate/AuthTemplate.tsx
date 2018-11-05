import * as React from 'react';
import * as classNames from 'classnames/bind';

const styles = require('./AuthTemplate.scss');
const cx = classNames.bind(styles);

const AuthTemplate: React.StatelessComponent<{
  children: React.ReactNode;
}> = ({ children }) => (
  <div className={cx('auth-template')}>
    <div className={cx('form-box')}>{children}</div>
  </div>
);

export default AuthTemplate;
