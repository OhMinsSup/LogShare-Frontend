import * as React from 'react';
import * as classNames from 'classnames/bind';
import { MdLockOutline } from 'react-icons/md';

const styles = require('./AuthInput.scss');
const cx = classNames.bind(styles);

type Props = {
  placeholder: string;
  value: string;
  name: string;
  disabled?: boolean;
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
};

const AuthInput: React.StatelessComponent<Props> = ({
  placeholder,
  value,
  onChange,
  disabled,
  name,
}) => (
  <div className={cx('input-wrapper', { disabled })}>
    <input
      className={cx('auth-input')}
      placeholder={placeholder}
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
