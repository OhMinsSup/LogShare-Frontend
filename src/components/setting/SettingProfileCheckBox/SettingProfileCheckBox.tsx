import * as React from 'react';
import * as classNames from 'classnames/bind';

const styles = require('./SettingProfileCheckBox.scss');
const cx = classNames.bind(styles);

const SettingProfileCheckBox: React.StatelessComponent<{
  info: string;
  name: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ info, checked, name, onChange }) => (
  <div className={cx('form-check')}>
    <label>
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
      />
      <span className={cx('info')}>{info}</span>
    </label>
  </div>
);

export default SettingProfileCheckBox;
