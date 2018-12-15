import * as React from 'react';
import * as classNames from 'classnames/bind';
import Video from '../../common/Video';
import FakeVideoCards from 'src/components/common/FakeVideoCards/FakeVideoCards';
import { VideosSubState } from 'src/store/modules/list/videos';

const styles = require('./VideoCard.scss');
const cx = classNames.bind(styles);

const VideoCard: React.StatelessComponent<{
  title: string;
  loading: boolean;
  videos: VideosSubState[];
}> = ({ title, videos, loading }) => {
  return (
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
          {loading ? (
            <FakeVideoCards videos={videos} />
          ) : (
            <React.Fragment>
              {videos.map((video, index) => {
                const {
                  videoId,
                  video_thumbnail,
                  video_url,
                  title,
                  play_time,
                  user: { username, thumbnail },
                  info: { views },
                  format,
                  createdAt,
                } = video;
                return (
                  <Video
                    key={index}
                    videoId={videoId}
                    video_thumbnail={video_thumbnail}
                    video_url={video_url}
                    title={title}
                    play_time={play_time}
                    username={username}
                    views={views}
                    format={format}
                    thumbnail={thumbnail}
                    createdAt={createdAt}
                  />
                );
              })}
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
