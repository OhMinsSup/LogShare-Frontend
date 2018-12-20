import * as React from 'react';
import * as classNames from 'classnames/bind';
import * as moment from 'moment';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter } from 'react-icons/fa';
import VideoLikeButton from '../VideoLikeButton';
import Button from 'src/components/common/Button';
import { MainVideoState } from 'src/store/modules/video';

const styles = require('./MainViewer.scss');
const cx = classNames.bind(styles);

type Props = {
  main_video: MainVideoState;
  logged: boolean;
};

type State = {};

class MainViewer extends React.Component<Props, State> {
  public render() {
    const { main_video, logged } = this.props;

    return (
      <div className={cx('main-viewer')}>
        <div className={cx('player')}>
          <div className={cx('inner')}>
            <div className={cx('player-container')}>
              <div className={cx('inner')}>
                <div className={cx('video-wrapper')}>
                  <div className={cx('wrapper')}>
                    <video controls>
                      <source
                        src={main_video.video_url.toString()}
                        type="video/mp4"
                      />
                    </video>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={cx('info')}>
          <div className={cx('inner')}>
            <div className={cx('category')}>
              <Link to="/">#{main_video.category}</Link>
            </div>
            <h1>{main_video.title}</h1>
            <span>조회수 {main_video.info.views}회</span>
            <div className={cx('btn-wrapper')}>
              <Button theme="default">팔로우</Button>
              <VideoLikeButton
                liked={main_video.liked}
                likes={main_video.info.likes}
                disabled={logged}
                onClick={() => console.log('dsss')}
              />
              <button
                className={cx('circle', 'share')}
                onClick={() => console.log('dsds')}
              >
                <FaFacebook />
              </button>
              <button
                className={cx('circle', 'share')}
                onClick={() => console.log('dsds')}
              >
                <FaTwitter />
              </button>
            </div>
          </div>
        </div>
        <div className={cx('separator')} />
        <div className={cx('meta')}>
          <div className={cx('inner')}>
            <div className={cx('top')}>
              <div className={cx('info')}>
                <div className={cx('user-wrapper')}>
                  <img src={main_video.user.thumbnail} />
                  <div className={cx('username')}>
                    @{main_video.user.username}
                  </div>
                </div>
                <div className={cx('content-head')}>
                  <div className={cx('subinfo')}>
                    <span>{moment(main_video.createdAt).format('LLL')}</span>
                  </div>
                </div>
                <div className={cx('description')}>
                  {main_video.description}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MainViewer;
