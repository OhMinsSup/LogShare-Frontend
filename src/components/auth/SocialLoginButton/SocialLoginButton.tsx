import * as React from 'react';
import * as classNames from 'classnames/bind';
import { FaFacebookF, FaGoogle } from 'react-icons/fa';

const styles = require('./SocialLoginButton.scss');
const cx = classNames.bind(styles);

type Props = {
  type: 'facebook' | 'google';
  onSocialLogin(provider: string): void;
};

const providers = {
  facebook: {
    icon: FaFacebookF,
  },
  google: {
    icon: FaGoogle,
  },
};

const SocialLoginButton: React.StatelessComponent<Props> = props => {
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
