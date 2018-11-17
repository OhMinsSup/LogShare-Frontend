import * as React from 'react';
import * as classNames from 'classnames/bind';

const styles = require('./SubmitBox.scss');
const cx = classNames.bind(styles);

const SubmitBox: React.StatelessComponent<{
  visible?: boolean;
}> = ({ visible }) => {
  return (
    <div className={cx('submit-box', visible ? 'appear' : 'disappear')}>
      <div />
    </div>
  );
};

export default SubmitBox;
