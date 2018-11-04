import * as React from 'react';
import * as classNames from 'classnames/bind';

const styles = require('./LandingTemplate.scss');
const cx = classNames.bind(styles);

const LandingTemplate: React.StatelessComponent<{
  form: React.ReactNode;
}> = ({ form }) => (
  <div className={cx('landing-template')}>
    <div className={cx('form-box')}>{form}</div>
  </div>
);

export default LandingTemplate;
