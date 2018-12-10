import * as React from 'react';
import * as className from 'classnames/bind';
import VideoCard from '../VideoCard/VideoCard';

const styles = require('./VideoCardList.scss');
const cx = className.bind(styles);

type Props = {};
type State = {};

class VideoCardList extends React.Component<Props, State> {
  public render() {
    return (
      <div className={cx('video-card-list')}>
        <VideoCard title="최근 시청한 영상" />
        <VideoCard title="추천 영상" />
        <VideoCard title="인기 영상" />
        <VideoCard title="자주보는 카테고리 영상" />
      </div>
    );
  }
}

export default VideoCardList;
