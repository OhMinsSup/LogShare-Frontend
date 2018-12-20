import * as React from 'react';
import * as classNames from 'classnames/bind';
import { SideVideoState } from 'src/store/modules/video';
import Video from 'src/components/common/Video';

const styles = require('./SubViewer.scss');
const cx = classNames.bind(styles);

const SubViewer: React.StatelessComponent<{
  videos: SideVideoState[];
  side_loading: boolean;
}> = ({ videos, side_loading }) => {
  return (
    <div className={cx('sub-viewer')}>
      <div className={cx('inner')}>
        {side_loading ? null : (
          <React.Fragment>
            {videos.map((video, index) => {
              const {
                videoId,
                video_thumbnail,
                video_url,
                title,
                play_time,
                profile: { username, thumbnail },
                info: { views },
                format,
                createdAt,
              } = video;
              return (
                <Video
                  key={index}
                  subViewer={true}
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
  );
};

export default SubViewer;
