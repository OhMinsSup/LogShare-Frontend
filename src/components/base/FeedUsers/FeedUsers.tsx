import * as React from 'react';
import * as classNames from 'classnames/bind';
import Button from '../../common/Button';
import { MdLabel } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { FeedsUserData } from 'src/store/modules/list/feeds';

const styles = require('./FeedUsers.scss');
const cx = classNames.bind(styles);

const FeedUsers: React.StatelessComponent<{
  user: FeedsUserData[];
}> = ({ user }) => (
  <div className={cx('feed-users')}>
    <div className={cx('header')}>
      <div className={cx('wrapper')}>
        <div className={cx('left-item')}>
          <MdLabel />
          <span>추천 유저</span>
        </div>
      </div>
    </div>
    <div className={cx('contents')}>
      {user.map((u, i) => {
        return (
          <div className={cx('user')} key={i}>
            <div>
              <Link to="/" className={cx('user-thumbnail')}>
                <img src={u.profile.thumbnail} />
              </Link>
            </div>
            <div className={cx('user-meta')}>
              <h3>
                <Link to={`/@${u.profile.username}`} className={cx('username')}>
                  @{u.profile.username}
                </Link>
              </h3>
              <p>{u.profile.shortBio}</p>
              <Button
                theme="flex"
                to={`/@${u.profile.username}`}
                className={cx('btn')}
              >
                블로그
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

export default FeedUsers;
