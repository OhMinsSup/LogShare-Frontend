import * as React from 'react';
import * as classNames from 'classnames/bind';

const styles = require('./Error.scss');
const cx = classNames.bind(styles);

const Error: React.StatelessComponent<{
  message: React.ReactNode;
}> = ({ message }) => <div className={cx('error')}>{message}</div>;

export default Error;
