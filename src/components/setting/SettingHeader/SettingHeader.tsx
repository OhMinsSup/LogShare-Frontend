import * as React from 'react';
import * as classNames from 'classnames/bind';

const styles = require('./SettingHeader.scss');
const cx = classNames.bind(styles);

const SettingHeader: React.StatelessComponent<{
  username: string | null;
}> = ({ username }) => (
  <div className={cx('setting-header')}>
    <h1>계정 설정 - @{username}</h1>
  </div>
);

export default SettingHeader;
