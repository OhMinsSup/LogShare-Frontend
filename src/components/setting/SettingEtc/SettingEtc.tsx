import * as React from 'react';
import * as classNames from 'classnames/bind';
import Button from 'src/components/common/Button';

const styles = require('./SettingEtc.scss');
const cx = classNames.bind(styles);

const SettingEtc: React.StatelessComponent<{
  onOpen: () => void;
}> = ({ onOpen }) => (
  <div className={cx('settings-etc')}>
    <h5>회원 탈퇴및 기타</h5>
    <section>
      <Button theme="outline-red" onClick={onOpen}>
        회원 탈퇴
      </Button>
    </section>
  </div>
);

export default SettingEtc;
