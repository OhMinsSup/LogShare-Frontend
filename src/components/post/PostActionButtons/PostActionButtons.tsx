import * as React from 'react';
import * as classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const styles = require('./PostActionButtons.scss');
const cx = classNames.bind(styles);

const PostActionButtons: React.StatelessComponent<{
  id: string;
  onAskRemove: () => void;
}> = ({ id, onAskRemove }) => (
  <div className={cx('post-action-buttons')}>
    <Link to={`/write?edit_id=${id}`} className={cx('update-btn')}>
      수정
    </Link>
    <button className={cx('remove-btn')} onClick={onAskRemove}>
      삭제
    </button>
  </div>
);

export default PostActionButtons;
