import * as React from 'react';
import * as classNames from 'classnames/bind';
import {
  FaHeart,
  FaRssSquare,
  FaGithub,
  FaFacebookSquare,
} from 'react-icons/fa';

const styled = require('./HomeInfo.scss');
const cx = classNames.bind(styled);

const HomeInfo: React.SFC<{
  onRss: () => void;
  onGithub: () => void;
  onFacebook: () => void;
}> = ({ onRss, onFacebook, onGithub }) => {
  return (
    <div className={cx('home-info')}>
      <div className={cx('info-header')}>
        <h4>2019 logshare</h4>
        <FaHeart />
      </div>
      <ul className={cx('rss-area')}>
        <li className={cx('item', 'rss')} onClick={onRss}>
          <FaRssSquare />
        </li>
        <li className={cx('item', 'github')} onClick={onGithub}>
          <FaGithub />
        </li>
        <li className={cx('item', 'facebook')} onClick={onFacebook}>
          <FaFacebookSquare />
        </li>
      </ul>
    </div>
  );
};

export default HomeInfo;
