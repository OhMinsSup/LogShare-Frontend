import * as React from 'react';
import * as classNames from 'classnames/bind';

const styles = require('./RegisterTemplate.scss');
const cx = classNames.bind(styles);

const RegisterTemplate: React.StatelessComponent<{
  form: React.ReactNode;
}> = ({ form }) => (
  <div className={cx('register-template')}>
    <div className={cx('form-box')}>{form}</div>
  </div>
);

export default RegisterTemplate;
