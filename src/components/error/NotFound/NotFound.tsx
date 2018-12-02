import * as React from 'react';
import * as classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const styles = require('./NotFound.scss');
const cx = classNames.bind(styles);

const NotFound: React.StatelessComponent<{
  code: number | null;
  message: string;
}> = ({ code, message }) => {
  return (
    <div className={cx('not-found')}>
      <div className={cx('code')}>{code}</div>
      <div className={cx('message')}>{message}</div>
      <Link className={cx('gohome')} to="/">
        홈으로
      </Link>
    </div>
  );
};

NotFound.defaultProps = {
  code: 404,
  message: '존재하지 않는 페이지',
};

export default NotFound;
