import * as React from 'react';
import * as classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import * as moment from 'moment';
import defaultThumbnail from '../../../static/default.jpg';

const style = require('./NoticeItem.scss');
const cx = classNames.bind(style);

const NoticeItem: React.StatelessComponent<{
  thumbnail: string;
  message: string;
  username: string;
  createdAt: string;
}> = ({ thumbnail, username, message, createdAt }) => (
  <Link to={`/@${username}`} className={cx('notif-wrapper')}>
    <div className={cx('notice-thumbnail')}>
      <img src={thumbnail || defaultThumbnail} />
    </div>
    <div className={cx('notif-content')}>
      <p>{message}</p>
      <p className={cx('notif-date')}>{moment(createdAt).format('LLL')}</p>
    </div>
  </Link>
);

export default NoticeItem;
