import * as React from 'react';
import * as classNames from 'classnames/bind';

const styles = require('./AuthButton.scss');
const cx = classNames.bind(styles);

const AuthButton: React.StatelessComponent<{
  type: string;
  register: boolean;
  onClick(): void;
}> = ({ type, register, onClick }) => (
  <button className={cx('auth-button', { register })} onClick={onClick}>
    <span className={cx('button')}>{type}</span>
  </button>
);

export default AuthButton;
