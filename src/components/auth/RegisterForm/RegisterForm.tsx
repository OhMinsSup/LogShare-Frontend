import * as React from 'react';
import * as classNames from 'classnames/bind';
import AuthInput from '../AuthInput';
import AuthButton from '../AuthButton';
import { Link } from 'react-router-dom';
import Error from 'src/components/common/Error';

const styles = require('./RegisterForm.scss');
const cx = classNames.bind(styles);

const RegisterForm: React.StatelessComponent<{
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
  error: string | null;
  disabled: boolean;
  onRegister(): void;
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
}> = ({
  username,
  email,
  password,
  passwordConfirm,
  onChange,
  error,
  onRegister,
  disabled,
}) => (
  <div className={cx('register-form')}>
    <div className={cx('logo')}>
      <Link to="/">LogShare</Link>
    </div>
    <div className={cx('title')}>
      <span>하나의 아이디로 LogShare 서버스를 이용하세요.</span>
    </div>
    <React.Fragment>
      <AuthInput
        placeholder="유저명"
        type="text"
        name="username"
        value={username}
        onChange={onChange}
      />
      <AuthInput
        placeholder="이메일"
        type="text"
        name="email"
        value={email}
        onChange={onChange}
      />
      <AuthInput
        placeholder="비밀번호(영문,숫자,특수문자 8-15)"
        type="password"
        name="password"
        value={password}
        onChange={onChange}
        disabled={disabled}
      />
      <AuthInput
        placeholder="비밀번호 확인"
        type="password"
        name="passwordConfirm"
        value={passwordConfirm}
        onChange={onChange}
        disabled={disabled}
      />
    </React.Fragment>
    {error && <Error message={error} />}
    <div className={cx('register-wrapper')}>
      <div className={cx('auth-link')}>
        <span>이미 계정이 있으세요?</span>
        <Link className={cx('link')} to="/auth/login">
          <span>로그인</span>
        </Link>
      </div>
      <AuthButton type="계정만들기" onClick={onRegister} register={true} />
    </div>
  </div>
);

export default RegisterForm;
