import * as React from 'react';
import * as classNames from 'classnames/bind';
import * as moment from 'moment';
import { Link } from 'react-router-dom';

const styles = require('./Video.scss');
const cx = classNames.bind(styles);

type Props = {
  videoId: string;
  title: string;
  play_time: string;
  video_thumbnail: string;
  username: string;
  thumbnail: string;
  video_url: string;
  views: number;
  format: string;
  createdAt: string;
  subViewer?: boolean;
};

type State = {
  hover: boolean;
};

class Video extends React.Component<Props, State> {
  public state: State = {
    hover: false,
  };

  constructor(props: Props) {
    super(props);
    this.getStillImage();
  }

  public getStillImage = () => {
    const { video_url } = this.props;
    console.log(video_url);
  };

  public onMouseOver = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e) {
      this.setState({
        hover: true,
      });
    }
  };

  public onMouseOut = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e) {
      this.setState({
        hover: false,
      });
    }
  };

  public render() {
    const {
      subViewer,
      videoId,
      video_thumbnail,
      video_url,
      play_time,
      username,
      thumbnail,
      createdAt,
      views,
      format,
      title,
    } = this.props;
    const { hover } = this.state;

    return (
      <div
        className={cx('video-wrapper', subViewer ? 'subViewer' : 'nonViewer')}
      >
        <Link
          to={`/video/viewer/${videoId}`}
          className={cx('thumbnail-wrapper')}
          onMouseOver={this.onMouseOver}
          onMouseOut={this.onMouseOut}
        >
          {hover ? (
            <Link to={`/video/viewer/${videoId}`}>
              <video controls muted={true} autoPlay={true}>
                <source
                  src={video_url}
                  type={`video/${!format ? 'mp4' : format}`}
                />
              </video>
            </Link>
          ) : (
            <React.Fragment>
              <img src={video_thumbnail} />
              <div className={cx('overlays')}>
                {play_time ? play_time : '00:00'}
              </div>
              <div className={cx('white-mask')} />
            </React.Fragment>
          )}
        </Link>
        <div className={cx('video-content')}>
          <div className={cx('between')}>
            <img className={cx('thumbnail')} src={thumbnail} />
            <Link to={`/@${username}`} className={cx('username')}>
              {username}
            </Link>
          </div>
          <h3>
            <Link to={`/video/viewer/${videoId}`}>{title}</Link>
          </h3>
          <div className={cx('subinfo')}>
            <span>조회수 {views ? views : 0}회</span>
            <span>{moment(createdAt).format('LL')}</span>
          </div>
        </div>
      </div>
    );
  }
}
export default Video;
