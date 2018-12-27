import * as React from 'react';
import * as classNames from 'classnames/bind';
import SettingProfileLink from '../SettingProfileLink';
import Button from 'src/components/common/Button';
import { ProfileState } from 'src/store/modules/setting';

const styles = require('./SettingSocial.scss');
const cx = classNames.bind(styles);

type Props = {
  profile: ProfileState;
  onSave: (github: string, facebook: string, twitter: string) => void;
};

type State = {
  twitter: string;
  github: string;
  facebook: string;
};

class SettingSocial extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      github: '',
      twitter: '',
      facebook: '',
    };
  }

  public feedInputs = () => {
    const { profile } = this.props;
    if (!profile) return;
    const keys = Object.keys(profile);
    const nextState = {};
    keys.forEach(key => {
      nextState[key] = profile[key] || '';
    });
    this.setState(nextState);
  };

  public componentDidUpdate(prevProps: Props) {
    if (prevProps.profile !== this.props.profile) {
      this.feedInputs();
    }
  }

  public componentDidMount() {
    this.feedInputs();
  }

  public onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    this.setState<any>({
      [name]: value,
    });
  };

  public onSave = () => {
    const { github, twitter, facebook } = this.state;
    const { onSave } = this.props;

    onSave(github, facebook, twitter);
  };

  public render() {
    const { github, facebook, twitter } = this.state;
    return (
      <div className={cx('setting-social')}>
        <h5>소셜</h5>
        <div className={cx('info')}>
          <SettingProfileLink
            label="GitHub"
            name="github"
            value={github}
            templateURL="https://github.com/"
            onChange={this.onChange}
            disabled={false}
          />
          <SettingProfileLink
            label="Twitter"
            name="twitter"
            value={twitter}
            onChange={this.onChange}
            templateURL="https://twitter.com/"
            disabled={false}
          />
          <SettingProfileLink
            label="Facebook"
            name="facebook"
            value={facebook}
            onChange={this.onChange}
            templateURL="https://facebook.com/"
            disabled={false}
          />
        </div>
        <div className={cx('button-wrapper')}>
          <Button theme="default" onClick={this.onSave}>
            저장
          </Button>
        </div>
      </div>
    );
  }
}

export default SettingSocial;
