import * as React from 'react';
import * as classNames from 'classnames/bind';

const styles = require('./SettingProfileLink.scss');
const cx = classNames.bind(styles);

const SettingProfileLink: React.StatelessComponent<{
  label: string;
  name: string;
  value: string;
  disabled: boolean;
  templateURL?: string;
  onChange?: (e: any) => any;
}> = ({ label, name, value, templateURL, onChange, disabled }) => (
  <div className={cx('setting-profile-link')}>
    <div className={cx('label')}>{label}</div>
    <div className={cx('input-wrapper')}>
      {templateURL && <div className={cx('template-url')}>{templateURL}</div>}
      <input
        value={value}
        name={name}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  </div>
);

export default SettingProfileLink;
