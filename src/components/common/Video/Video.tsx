import * as React from 'react';
import * as classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const styles = require('./Video.scss');
const cx = classNames.bind(styles);

const Video: React.StatelessComponent<{}> = () => {
  const thumbnail =
    'https://i.ytimg.com/vi/nt4g6yMPoLE/hqdefault.jpg?sqp=-oaymwEiCNIBEHZIWvKriqkDFQgBFQAAAAAYASUAAMhCPQCAokN4AQ==&rs=AOn4CLBBKWnWfZzu_QHhnndT92ep6Bb8Ag';
  return (
    <div className={cx('video-wrapper')}>
      {thumbnail && (
        <Link to="/" className={cx('thumbnail-wrapper')}>
          {thumbnail && <img src={thumbnail} />}
          <div className={cx('overlays')}>5:52</div>
          <div className={cx('white-mask')} />
        </Link>
      )}
      <div className={cx('video-content')}>
        <div className={cx('between')}>
          <img
            className={cx('thumbnail')}
            src="https://thumb.velog.io/resize?url=https://images.velog.io/profiles/yesdoing/thumbnails/1538470361.899.png&width=128"
          />
          <Link to="/" className={cx('username')}>
            veloss
          </Link>
        </div>
        <h3>
          <Link to="/">Violet Evergarden - Best OST Covers</Link>
        </h3>
        <div className={cx('subinfo')}>
          <span>조회수 7만회</span>
          <span>7개월 전</span>
        </div>
      </div>
    </div>
  );
};

export default Video;
