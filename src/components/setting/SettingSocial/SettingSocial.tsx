import * as React from 'react';
import * as classNames from 'classnames/bind';
import SettingProfileLink from '../SettingProfileLink';
import Button from 'src/components/common/Button';

const styles = require('./SettingSocial.scss');
const cx = classNames.bind(styles);

type Props = {};
type State = {};

class SettingSocial extends React.Component<Props, State> {
  public render() {
    return (
      <div className={cx('setting-social')}>
        <h5>소셜</h5>
        <div className={cx('info')}>
          <SettingProfileLink
            label="GitHub"
            name="github"
            value=""
            templateURL="https://github.com/"
            disabled={false}
          />
          <SettingProfileLink
            label="Twitter"
            name="twitter"
            value=""
            templateURL="https://twitter.com/"
            disabled={false}
          />
          <SettingProfileLink
            label="Facebook"
            name="facebook"
            value=""
            templateURL="https://facebook.com/"
            disabled={false}
          />
        </div>
        <div className={cx('button-wrapper')}>
          <Button theme="default">저장</Button>
        </div>
      </div>
    );
  }
}

export default SettingSocial;
