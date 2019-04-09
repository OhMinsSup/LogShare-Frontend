import * as React from 'react';
import * as classNames from 'classnames/bind';
import { FaFacebookF, FaGoogle, FaGithub } from 'react-icons/fa';

const styles = require('./SocialLoginButton.scss');
const cx = classNames.bind(styles);

const providers = {
  facebook: {
    icon: FaFacebookF,
  },
  google: {
    icon: FaGoogle,
  },
  github: {
    icon: FaGithub,
  },
};

const SocialLoginButton: React.StatelessComponent<{
  type: 'facebook' | 'google' | 'github';
  onSocialLogin(provider: string): void;
}> = props => {
  const { type, onSocialLogin } = props;
  const { icon: Icon } = providers[type];

  return (
    <div
      className={cx('social-login-button', type)}
      onClick={() => onSocialLogin(type)}
    >
      <div className={cx('icon')}>
        <Icon />
      </div>
      <div className={cx('Text')}>
        {type} <span className={cx('Login')}>로그인</span>
      </div>
    </div>
  );
};

SocialLoginButton.defaultProps = {
  type: 'facebook',
};

export default SocialLoginButton;
