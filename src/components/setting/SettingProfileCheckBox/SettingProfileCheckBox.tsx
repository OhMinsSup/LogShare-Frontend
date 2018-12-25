import * as React from 'react';
import * as classNames from 'classnames/bind';

const styles = require('./SettingProfileCheckBox.scss');
const cx = classNames.bind(styles);

const SettingProfileCheckBox: React.StatelessComponent<{
  info: string;
}> = ({ info }) => (
  <div className={cx('form-check')}>
    <label>
      <input type="checkbox" />
      <span className={cx('info')}>{info}</span>
    </label>
  </div>
);

export default SettingProfileCheckBox;
