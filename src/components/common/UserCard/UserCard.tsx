import * as React from 'react';
import * as classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import defaultThumbnail from '../../../static/default.jpg';
import Button from '../Button';

const style = require('./UserCard.scss');
const cx = classNames.bind(style);

const UserCard: React.StatelessComponent<{
  username: string;
  thumbnail: string;
  shortBio: string;
  onClick(username: string): void;
}> = ({ username, shortBio, thumbnail, onClick }) => (
  <div className={cx('user-card')}>
    <Link to={`/@${username}`} className={cx('profile-card-bg')} />
    <div className={cx('profile-content')}>
      <Link to={`/@${username}`} className={cx('user-thumbnail')}>
        <img src={thumbnail || defaultThumbnail} className={cx('thumbnail')} />
      </Link>
      <div className={cx('user-action')}>
        <div className={cx('action')}>
          <Button
            theme="flex"
            className={cx('btn')}
            onClick={() => onClick(username)}
          >
            블로그
          </Button>
        </div>
      </div>
      <div className={cx('user-info')}>
        <div className={cx('username-wrapper')}>
          <Link to={`/@${username}`} className={cx('username')}>
            {username}
          </Link>
        </div>
        <p className={cx('short-bio')}>{shortBio}</p>
      </div>
    </div>
  </div>
);

export default UserCard;
