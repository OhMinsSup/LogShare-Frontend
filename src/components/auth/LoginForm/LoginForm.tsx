import * as React from 'react';
import * as classNames from 'classnames/bind';
import SocialLoginButton from '../SocialLoginButton';
import AuthInput from 'src/components/auth/AuthInput';
import AuthButton from 'src/components/auth/AuthButton';
import { Link } from 'react-router-dom';
import Error from '../../common/Error';

const styles = require('./LoginForm.scss');
const cx = classNames.bind(styles);

const LoginForm: React.StatelessComponent<{
  email: string;
  password: string;
  error: string | null;
  onLogin(): void;
  onSocialLogin(provider: string): void;
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
}> = ({ email, password, onChange, error, onLogin, onSocialLogin }) => (
  <div className={cx('login-form')}>
    <div className={cx('logo')}>
      <Link to="/">LogShare</Link>
    </div>
    <div className={cx('title')}>
      <span>하나의 아이디로 LogShare 서버스를 이용하세요.</span>
    </div>
    <div className={cx('social-wrapper')}>
      <div className={cx('social-button')}>
        <SocialLoginButton type="google" onSocialLogin={onSocialLogin} />
        <SocialLoginButton type="facebook" onSocialLogin={onSocialLogin} />
      </div>
    </div>
    <div className={cx('login-divider')}>
      <div className={cx('line')} />
      <div className={cx('text')}>
        <span>또는</span>
      </div>
    </div>
    <React.Fragment>
      <AuthInput
        placeholder="이메일"
        name="email"
        value={email}
        onChange={onChange}
      />
      <AuthInput
        placeholder="비밀번호"
        name="password"
        value={password}
        onChange={onChange}
      />
    </React.Fragment>
    {error && <Error message={error} />}
    <AuthButton type="로그인" onClick={onLogin} register={false} />
    <div className={cx('auth-link')}>
      <span>계정이 없으신가요?</span>
      <Link className={cx('link')} to="/auth/register">
        <span>회원가입</span>
      </Link>
    </div>
  </div>
);

export default LoginForm;
