import * as React from 'react';
import * as classNames from 'classnames/bind';
import * as moment from 'moment';
import { Link } from 'react-router-dom';
import { PostSequenceState } from 'src/store/modules/post';

const styles = require('./PostSequences.scss');
const cx = classNames.bind(styles);

const PostSequencesItem: React.StatelessComponent<{
  sequence: PostSequenceState;
  active: boolean;
}> = ({ sequence, active }) => {
  const to = `/post/${sequence._id}`;
  return (
    <div className={cx('post-sequences-item', { active })}>
      <div className={cx('date')}>
        {moment(sequence.createdAt).format('ll')}
      </div>
      <div className={cx('title')}>
        <Link to={to}>{sequence.title}</Link>
      </div>
      <p>{sequence.body}</p>
    </div>
  );
};

const PostSequences: React.StatelessComponent<{
  sequences?: PostSequenceState[] | null;
  username: string | null;
  currentPostId: string | null;
}> = ({ username, sequences, currentPostId }) => {
  if (!sequences || sequences.length === 0 || sequences.length === 1)
    return null;
  return (
    <div className={cx('post-sequences')}>
      <div className={cx('wrapper')}>
        <h3>{username}님이 작성한 다른 포스트</h3>
        {sequences.map((s, i) => (
          <PostSequencesItem
            key={i}
            sequence={s}
            active={s._id === currentPostId}
          />
        ))}
      </div>
    </div>
  );
};

export default PostSequences;
