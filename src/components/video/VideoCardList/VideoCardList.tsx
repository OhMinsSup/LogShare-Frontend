import * as React from 'react';
import * as className from 'classnames/bind';
import VideoCard from '../VideoCard/VideoCard';
import { VideosSubState } from 'src/store/modules/list/videos';

const styles = require('./VideoCardList.scss');
const cx = className.bind(styles);

type Props = {
  videos: VideosSubState[];
  loading: boolean;
};
type State = {};

class VideoCardList extends React.Component<Props, State> {
  public render() {
    const { videos, loading } = this.props;
    return (
      <div className={cx('video-card-list')}>
        <VideoCard title="모든 영상" videos={videos} loading={loading} />
      </div>
    );
  }
}

export default VideoCardList;
