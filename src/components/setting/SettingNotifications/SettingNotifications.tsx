import * as React from 'react';
import * as classNames from 'classnames/bind';
import SettingProfileCheckBox from '../SettingProfileCheckBox';

const styles = require('./SettingNotifications.scss');
const cx = classNames.bind(styles);

type Props = {};
type State = {};

class SettingNotifications extends React.Component<Props, State> {
  public render() {
    return (
      <div className={cx('setting-notifications')}>
        <h5>이벤트및 광고성 정보 수신 알림</h5>
        <div className={cx('info')}>
          <SettingProfileCheckBox info="새 기능, 이벤트 홍보 등의 알림 수신" />
        </div>
      </div>
    );
  }
}

export default SettingNotifications;
