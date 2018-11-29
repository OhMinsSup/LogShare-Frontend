import * as React from 'react';
import * as classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import defaultThumbnail from '../../../static/default.jpg';
import Button from '../Button';

const style = require('./UserCard.scss');
const cx = classNames.bind(style);

const UserCard = () => (
  <div className={cx('user-card')}>
    <Link to="/" className={cx('profile-card-bg')} />
    <div className={cx('profile-content')}>
      <Link to="/" className={cx('user-thumbnail')}>
        <img src={defaultThumbnail} className={cx('thumbnail')} />
      </Link>
      <div className={cx('user-action')}>
        <div className={cx('action')}>
          <Button theme="flex" className={cx('btn')}>
            팔로우
          </Button>
        </div>
      </div>
      <div className={cx('user-info')}>
        <div className={cx('username-wrapper')}>
          <Link to="/" className={cx('username')}>
            Mark Lee
          </Link>
        </div>
        <p className={cx('short-bio')}>
          Studio XID Inc. Software Engineer / Microsoft MVP TypeScript
        </p>
      </div>
    </div>
  </div>
);

export default UserCard;
