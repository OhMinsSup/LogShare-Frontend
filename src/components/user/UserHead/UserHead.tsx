import * as React from 'react';
import * as classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { FaCog } from 'react-icons/fa';
import { MdEmail, MdEventNote } from 'react-icons/md';
import defaultThumbnail from '../../../static/default.jpg';

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

const UserHead = () => (
  <div className={cx('user-head')}>
    <div className={cx('cover-photo')} />
    <div className={cx('head-meta')}>
      <div className={cx('profile-top-section')}>
        <div className={cx('profile-thumbnail')}>
          <Link to="/" className={cx('thumbnail')}>
            <img src={defaultThumbnail} />
          </Link>
        </div>
        <div className={cx('info')}>
          <h1>
            <Link to="/" className={cx('username')}>
              Veloss
            </Link>
          </h1>
          <span>ddsdsssdsdd</span>
        </div>
        <div className={cx('profile-btns')}>
          <button className={cx('setting')}>
            <FaCog />
            프로필 수정하기
          </button>
        </div>
      </div>
      <div className={cx('profile-extra-info')}>
        <div className={cx('profile-bio')}>
          <BioItem icon={<MdEmail />} text="public.veloss@naver.com" />
          <BioItem icon={<MdEventNote />} text="Joined April 12, 2018" />
        </div>
        <div className={cx('profile-score')}>
          <ScoreItem title="포스트" score={0} />
          <ScoreItem title="팔로우" score={0} />
          <ScoreItem title="팔로잉" score={0} />
        </div>
      </div>
    </div>
  </div>
);

export default UserHead;
