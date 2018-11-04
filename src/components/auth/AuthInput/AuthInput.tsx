import * as React from 'react';
import * as classNames from 'classnames/bind';

const styles = require('./AuthInput.scss');
const cx = classNames.bind(styles);

type Props = {
  placeholder: string;
  value: string;
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
};

const AuthInput: React.StatelessComponent<Props> = ({
  placeholder,
  value,
  onChange,
}) => (
  <div className={cx('input-wrapper')}>
    <input
      className={cx('auth-input')}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  </div>
);

export default AuthInput;
