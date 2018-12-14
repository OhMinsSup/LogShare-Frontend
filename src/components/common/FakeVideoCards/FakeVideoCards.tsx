import * as React from 'react';
import * as classNames from 'classnames/bind';
import { createArray } from 'src/lib/common';

const styles = require('./FakeVideoCards.scss');
const cx = classNames.bind(styles);

const FakeVideoCard: React.StatelessComponent<{}> = () => (
  <div className={cx('video-card', 'fake-video-card')}>
    <div className={cx('thumbnail-wrapper')}>
      <img className={cx('thumbnail')} />
    </div>
    <div className={cx('video-content')}>
      <div className={cx('between')}>
        <div className={cx('thumbnail')} />
        <div className={cx('username')} />
      </div>
      <div className={cx('title')} />
      <div className={cx('subinfo')}>
        <div className={cx('item-views')} />
        <div className={cx('item-date')} />
      </div>
    </div>
  </div>
);

const FakeVideoCards: React.StatelessComponent<{
  videos: any[];
  count?: number;
}> = ({ videos, count }) => (
  <React.Fragment>
    {createArray(videos.length === 0 || count === 6 ? 6 : videos.length).map(
      num => (
        <FakeVideoCard key={num} />
      )
    )}
  </React.Fragment>
);

export default FakeVideoCards;
