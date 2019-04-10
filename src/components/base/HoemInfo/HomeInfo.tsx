import * as React from 'react';
import * as classNames from 'classnames/bind';
import { FaHeart, FaRssSquare } from 'react-icons/fa';

const styled = require('./HomeInfo.scss');
const cx = classNames.bind(styled);

const HomeInfo: React.SFC<{
  onRss: () => void;
}> = ({ onRss }) => {
  return (
    <div className={cx('home-info')}>
      <div className={cx('info-header')}>
        <h4>2019 logshare</h4>
        <FaHeart />
      </div>
      <ul className={cx('rss-area')}>
        <li className={cx('item')} onClick={onRss}>
          <FaRssSquare />
        </li>
      </ul>
    </div>
  );
};

export default HomeInfo;
