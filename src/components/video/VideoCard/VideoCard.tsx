import * as React from 'react';
import * as classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const styles = require('./VideoCard.scss');
const cx = classNames.bind(styles);

const Video: React.StatelessComponent<{
  thumbnail?: string;
  title?: string;
  username?: string;
  views?: number;
  createdAt?: string;
  time?: string;
}> = () => (
  <div className={cx('video-wrapper')}>
    <div className={cx('video')}>
      <div className={cx('video-thumbnail')}>
        <div className={cx('inner')}>
          <div className={cx('thumbnail')}>
            <img src="https://i.ytimg.com/vi/2xtxj_l7Yeo/hqdefault.jpg?sqp=-oaymwEYCNIBEHZIVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLBDo_73cOzUHu8X-c2q8vbCvnJNZg" />
          </div>
          <div className={cx('overlays')}>
            <span>5:52</span>
          </div>
        </div>
      </div>
      <div className={cx('video-details')}>
        <div className={cx('details')}>
          <h3 className={cx('title')}>
            <Link to="/" className={cx('title')}>
              【繁中字幕】7!! - オレンジ ( 四月は君の嘘 ED2 )
            </Link>
          </h3>
          <div className={cx('info')}>
            <div className={cx('inner')}>
              <div className={cx('name')}>
                <Link to="/">veloss</Link>
              </div>
              <div className={cx('views')}>
                <span>조회수 7만회</span>
                <span style={{ margin: '0 4px' }}>•</span>
                <span>1년전</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const VideoCard: React.StatelessComponent<{
  title: string;
}> = ({ title }) => (
  <div className={cx('video-card')}>
    <div className={cx('video-head')}>
      <h2>{title}</h2>
    </div>
    <div className={cx('separator')}>
      <div className={cx('blue-segment')} />
    </div>
    <div className={cx('video-content')}>
      <div className={cx('inner')}>
        <Video />
        <Video />
        <Video />
        <Video />
        <Video />
        <Video />
        <Video />
        <Video />
        <Video />
        <Video />
      </div>
    </div>
  </div>
);

export default VideoCard;
