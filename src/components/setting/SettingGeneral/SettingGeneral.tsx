import * as React from 'react';
import * as classNames from 'classnames/bind';
import SettingProfileLink from '../SettingProfileLink';

const styles = require('./SettingGeneral.scss');
const cx = classNames.bind(styles);

const SettingGeneral: React.StatelessComponent<{
  username: string | null;
  email: string | null;
}> = ({ username, email }) => (
  <div className={cx('setting-general')}>
    <h5>계정</h5>
    <div className={cx('info')}>
      <SettingProfileLink
        label="유저명"
        name="username"
        value={typeof username as string}
        disabled={true}
      />
      <SettingProfileLink
        label="이메일"
        name="email"
        value={typeof email as string}
        disabled={true}
      />
      <SettingProfileLink
        label="LogShare 주소"
        name="address"
        value={`http://localhost:3000/@${username}`}
        disabled={true}
      />
    </div>
  </div>
);

export default SettingGeneral;
