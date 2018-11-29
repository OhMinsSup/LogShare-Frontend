import * as React from 'react';
import * as classNames from 'classnames/bind';
import * as moment from 'moment';
import { Link } from 'react-router-dom';
import { FaCog } from 'react-icons/fa';
import { MdEmail, MdEventNote } from 'react-icons/md';
import defaultThumbnail from '../../../static/default.jpg';
import { UserProfileState } from 'src/store/modules/user';

const styles = require('./UserHead.scss');
const cx = classNames.bind(styles);

const BioItem: React.StatelessComponent<{
  icon: React.ReactNode;
  text: string;
}> = ({ icon, text }) => (
  <div className={cx('bio-info')}>
    {icon}
    <p>
      <span>{text}</span>
    </p>
  </div>
);

const ScoreItem: React.StatelessComponent<{
  title: string;
  score: number;
}> = ({ title, score }) => (
  <div className={cx('score-widget')}>
    <span className={cx('small-text')}>{title}</span>
    <p className={cx('score')}>{score}</p>
  </div>
);

const UserHead: React.StatelessComponent<{
  profile: UserProfileState;
}> = ({ profile }) => (
  <div className={cx('user-head')}>
    <div className={cx('cover-photo')} />
    <div className={cx('head-meta')}>
      <div className={cx('profile-top-section')}>
        <div className={cx('profile-thumbnail')}>
          <Link to="/" className={cx('thumbnail')}>
            <img src={profile.profile.thumbnail || defaultThumbnail} />
          </Link>
        </div>
        <div className={cx('info')}>
          <h1>
            <Link to="/" className={cx('username')}>
              {profile.profile.username}
            </Link>
          </h1>
          <span>{profile.profile.shortBio}</span>
        </div>
        <div className={cx('profile-btns')}>
          <button className={cx('setting')}>
            <FaCog />
            프로필 수정하기
          </button>
          <button className={cx('setting')}>팔로우</button>
        </div>
      </div>
      <div className={cx('profile-extra-info')}>
        <div className={cx('profile-bio')}>
          <BioItem icon={<MdEmail />} text={profile.email} />
          <BioItem
            icon={<MdEventNote />}
            text={moment(profile.createdAt).format('ll')}
          />
        </div>
        <div className={cx('profile-score')}>
          <ScoreItem title="포스트" score={profile.info.post} />
          <ScoreItem title="팔로우" score={profile.info.follower} />
          <ScoreItem title="팔로잉" score={profile.info.following} />
        </div>
      </div>
    </div>
  </div>
);

export default UserHead;
