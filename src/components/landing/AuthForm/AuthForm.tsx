import * as React from 'react';
import * as classNames from 'classnames/bind';
import SocialLoginButton from '../SocialLoginButton';

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
  </div>
);

export default AuthForm;
