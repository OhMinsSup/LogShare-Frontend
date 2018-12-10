import * as React from 'react';
import * as classNames from 'classnames/bind';
import Video from '../../common/Video';

const styles = require('./VideoCard.scss');
const cx = classNames.bind(styles);

const VideoCard: React.StatelessComponent<{
  title: string;
}> = ({ title }) => (
  <div className={cx('video-card')}>
    <div className={cx('video-head')}>
      <h2>{title}</h2>
      <p>더보기</p>
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
      </div>
    </div>
  </div>
);

export default VideoCard;
