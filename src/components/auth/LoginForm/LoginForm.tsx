import * as React from 'react';
import * as classNames from 'classnames/bind';
import SocialLoginButton from '../SocialLoginButton';
import AuthInput from 'src/components/auth/AuthInput';
import AuthButton from 'src/components/auth/AuthButton';
import { Link } from 'react-router-dom';

const styles = require('./LoginForm.scss');
const cx = classNames.bind(styles);

const LoginForm: React.StatelessComponent<{}> = ({}) => (
  <div className={cx('login-form')}>
    <div className={cx('logo')}>
      <Link to="/">LogShare</Link>
    </div>
    <div className={cx('title')}>
      <span>하나의 아이디로 LogShare 서버스를 이용하세요.</span>
    </div>
    <div className={cx('social-wrapper')}>
      <div className={cx('social-button')}>
        <SocialLoginButton
          type="google"
          onSocialLogin={() => console.log('구글')}
        />
        <SocialLoginButton
          type="facebook"
          onSocialLogin={() => console.log('페이스북')}
        />
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
        value=""
        onChange={() => console.log('dss')}
      />
      <AuthInput
        placeholder="비밀번호"
        name="password"
        value=""
        onChange={() => console.log('dss')}
      />
    </React.Fragment>
    <AuthButton
      type="로그인"
      onClick={() => console.log('gkgk')}
      register={false}
    />
    <div className={cx('auth-link')}>
      <span>계정이 없으신가요?</span>
      <Link className={cx('link')} to="/auth/register">
        <span>회원가입</span>
      </Link>
    </div>
  </div>
);

export default LoginForm;
