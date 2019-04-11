import * as React from 'react';
import * as classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { NoticeMessageState } from 'src/store/modules/notice';
import NoticeItem from 'src/components/notice/NoticeItem/NoticeItem';

const style = require('./NoticeModal.scss');
const cx = classNames.bind(style);

const NoticeModal: React.StatelessComponent<{
  username: string | null;
  notices: NoticeMessageState[];
  onNotice(): void;
}> = ({ onNotice, notices, username }) => (
  <div className={cx('notice-modal')}>
    <div className={cx('content')}>
      <div className={cx('content-body')}>
        {notices.map((notice, index) => {
          const { message, createdAt, thumbnail, username } = notice;

          return (
            <NoticeItem
              key={index}
              message={message}
              username={username}
              createdAt={createdAt}
              thumbnail={thumbnail}
            />
          );
        })}
      </div>
      <div className={cx('content-footer')}>
        <Link
          to={`/notice/@${username}`}
          className={cx('left-item')}
          onClick={onNotice}
        >
          알림 메세지 모두 보기
        </Link>
        <button className={cx('rigth-item')} onClick={onNotice}>
          알림 메세지 확인
        </button>
      </div>
    </div>
  </div>
);

export default NoticeModal;
