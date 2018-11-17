import * as React from 'react';
import * as classNames from 'classnames/bind';
import { MdLockOutline } from 'react-icons/md';

const styles = require('./AuthInput.scss');
const cx = classNames.bind(styles);

const AuthInput: React.StatelessComponent<{
  placeholder: string;
  value: string;
  name: string;
  type: string;
  disabled?: boolean;
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
}> = ({ placeholder, value, onChange, disabled, name, type }) => (
  <div className={cx('input-wrapper', { disabled })}>
    <input
      className={cx('auth-input')}
      placeholder={placeholder}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
    />
    {disabled && (
      <div className={cx('lock-wrapper')}>
        <div className={cx('lock')}>
          <MdLockOutline />
        </div>
      </div>
    )}
  </div>
);

export default AuthInput;
