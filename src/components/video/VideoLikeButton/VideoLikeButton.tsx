import * as React from 'react';
import * as classNames from 'classnames/bind';
import * as Tooltip from 'react-tooltip';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const styles = require('./VideoLikeButton.scss');
const cx = classNames.bind(styles);

const VideoLikeButton: React.StatelessComponent<{
  likes: number;
  liked: boolean;
  disabled: boolean;
  onClick: () => void;
}> = ({ likes, liked, onClick, disabled }) => (
  <button
    className={cx('video-like-button', { liked, disabled: !disabled })}
    onClick={!disabled ? undefined : onClick}
    {...(!disabled ? { 'data-tip': '로그인 후 이용해주세요.' } : {})}
  >
    {liked ? <FaHeart /> : <FaRegHeart />}
    <div className={cx('count')}>{likes ? likes.toLocaleString() : 0}</div>
    <Tooltip effect="solid" className="tooltip" />
  </button>
);

export default VideoLikeButton;
