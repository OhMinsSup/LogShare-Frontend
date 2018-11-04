import * as React from 'react';
import * as classNames from 'classnames/bind';
import SocialLoginButton from '../SocialLoginButton';
import AuthInput from 'src/components/auth/AuthInput';
import AuthButton from 'src/components/auth/AuthButton';
import { Link } from 'react-router-dom';

const styles = require('./AuthForm.scss');
const cx = classNames.bind(styles);

const AuthForm: React.StatelessComponent = () => (
  <div className={cx('auth-form')}>
    <div className={cx('logo')}>LogShare</div>
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
    <AuthInput
      placeholder="이메일"
      value=""
      onChange={() => console.log('dss')}
    />
    <AuthInput
      placeholder="비밀번호"
      value=""
      onChange={() => console.log('dss')}
    />
    <AuthButton type="로그인" register={false} />
    <div className={cx('auth-link')}>
      <span>계정이 없으신가요?</span>
      <Link className={cx('link')} to="/auth-register">
        <span>회원가입</span>
      </Link>
      <Link className={cx('tour')} to="/">
        <span>둘러보기</span>
      </Link>
    </div>
  </div>
);

export default AuthForm;
