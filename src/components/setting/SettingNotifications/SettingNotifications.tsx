import * as React from 'react';
import * as classNames from 'classnames/bind';
import SettingProfileCheckBox from '../SettingProfileCheckBox';

const styles = require('./SettingNotifications.scss');
const cx = classNames.bind(styles);

type Props = {
  email_promotion: boolean;
  askSetting: boolean;
  onChecked: (checked: boolean) => void;
};

type State = {
  checked: boolean;
};

class SettingNotifications extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      checked: false,
    };
  }

  public onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      checked: !this.state.checked,
    });

    this.props.onChecked(!this.state.checked);
  };

  public feedChecked = () => {
    const { email_promotion } = this.props;
    if (!email_promotion) return;

    this.setState({
      checked: email_promotion,
    });
  };

  public componentDidUpdate(prevProps: Props) {
    if (
      prevProps.email_promotion !== this.props.email_promotion ||
      prevProps.askSetting !== this.props.askSetting
    ) {
      this.feedChecked();
    }
  }

  public componentDidMount() {
    this.feedChecked();
  }

  public render() {
    const { checked } = this.state;
    return (
      <div className={cx('setting-notifications')}>
        <h5>이벤트및 광고성 정보 수신 알림</h5>
        <div className={cx('info')}>
          <SettingProfileCheckBox
            checked={checked}
            name="event"
            info="새 기능, 이벤트 홍보 등의 알림 수신"
            onChange={this.onChange}
          />
        </div>
      </div>
    );
  }
}

export default SettingNotifications;
