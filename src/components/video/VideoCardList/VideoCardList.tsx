import * as React from 'react';
import * as className from 'classnames/bind';
import VideoCard from '../VideoCard/VideoCard';

const styles = require('./VideoCardList.scss');
const cx = className.bind(styles);

class VideoCardList extends React.Component<{}> {
  public render() {
    return (
      <div className={cx('video-card-list')}>
        <VideoCard title="최근 시청한 영상" />
        <VideoCard title="추천" />
        <VideoCard title="음악관련" />
        <VideoCard title="농국관련" />
        <VideoCard title="개발관련" />
      </div>
    );
  }
}

export default VideoCardList;
