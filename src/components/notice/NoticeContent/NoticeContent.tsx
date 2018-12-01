import * as React from 'react';
import * as classNames from 'classnames/bind';
import NoticeItem from '../NoticeItem/NoticeItem';
import { MessageSubState } from 'src/store/modules/list/notices';

const styles = require('./NoticeContent.scss');
const cx = classNames.bind(styles);

const NoticeContent: React.StatelessComponent<{
  notices: MessageSubState[];
}> = ({ notices }) => (
  <div className={cx('notice-content')}>
    <div className={cx('notice-header')}>
      <h1>알림창</h1>
    </div>
    <div className={cx('notice-body')}>
      {notices.map((notice, index) => {
        const { message, createdAt, thumbnail } = notice;

        return (
          <NoticeItem
            key={index}
            message={message}
            createdAt={createdAt}
            thumbnail={thumbnail}
          />
        );
      })}
    </div>
  </div>
);

export default NoticeContent;
