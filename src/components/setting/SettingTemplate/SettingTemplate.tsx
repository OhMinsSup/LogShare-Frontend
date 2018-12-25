import * as React from 'react';
import * as classNames from 'classnames/bind';

const styles = require('./SettingTemplate.scss');
const cx = classNames.bind(styles);

const SettingTemplate: React.StatelessComponent<{
  children: React.ReactNode;
}> = ({ children }) => <div className={cx('setting-template')}>{children}</div>;

export default SettingTemplate;
