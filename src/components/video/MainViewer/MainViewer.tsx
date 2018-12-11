import * as React from 'react';
import * as classNames from 'classnames/bind';
import * as moment from 'moment';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter } from 'react-icons/fa';
import VideoLikeButton from '../VideoLikeButton';
import defaultThumbnail from '../../../static/default.jpg';
import Button from 'src/components/common/Button';

const styles = require('./MainViewer.scss');
const cx = classNames.bind(styles);

class MainViewer extends React.Component<{}> {
  public render() {
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
                        src="https://res.cloudinary.com/planeshare/video/upload/v1544270562/LogShare/video-upload/%ED%97%AC%EB%A1%9C%EC%9A%B0%EB%B0%A9/360p_%EB%B0%95%ED%9A%A8%EC%8B%A0_2016_LIVE_I_AM_A_DREAMER_HOME.mp4"
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
              <Link to="/">#카테고리</Link>
            </div>
            <h1>Violet Evergarden - Best OST Covers</h1>
            <span>조회수 1,944,076회</span>
            <div className={cx('btn-wrapper')}>
              <Button theme="default">팔로우</Button>
              <VideoLikeButton
                liked={false}
                likes={5}
                disabled={false}
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
                  <img src={defaultThumbnail} />
                  <div className={cx('username')}>@{'veloss'}</div>
                </div>
                <div className={cx('content-head')}>
                  <h3>
                    <Link to="/">타이틀</Link>
                  </h3>
                  <div className={cx('subinfo')}>
                    <span>
                      {moment('2018-12-03T01:24:16.932Z').format('LLL')}
                    </span>
                  </div>
                </div>
                <div className={cx('description')}>
                  Violet Evergarden - Original Soundtrack (Best Covers)
                  紫羅蘭永恆花園 - 原聲帶 Covers
                  ヴァイオレット・エヴァーガーデン - OST Covers
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
