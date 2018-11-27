import * as React from 'react';
import * as classNames from 'classnames/bind';

const styles = require('./FakePost.scss');
const cx = classNames.bind(styles);

const FakePost = () => (
  <React.Fragment>
    <div className={cx('post-head', 'placeholder')}>
      <div className={cx('userinfo')}>
        <div className={cx('user-thumbnail')}>
          <div className={cx('fake-img')} />
        </div>
        <div className={cx('info')}>
          <div className={cx('username')}>
            <div className={cx('gray-block', '_username')} />
          </div>
          <div className={cx('description')}>
            <div className={cx('gray-block', '_description')} />
          </div>
        </div>
      </div>
      <div className={cx('gray-block', '_title')} />
      <div className={cx('date-and-likes')}>
        <div className={cx('date')}>
          <div className={cx('gray-block', '_date')} />
        </div>
        <div className={cx('placeholder')} />
      </div>
      <div className={cx('separator')} />
    </div>
    <div className={cx('post-content', 'placeholder')}>
      <div className={cx('post-thumbnail')}>
        <div className={cx('fake-img')} />
      </div>
      <div className={cx('contents')}>
        <div className={cx('gray-block')} />
        <div className={cx('gray-block')} />
        <div className={cx('gray-block')} style={{ width: '75%' }} />
        <div className={cx('line-breaker')} />
        <div className={cx('gray-block')} />
        <div className={cx('gray-block')} style={{ width: '40%' }} />
        <div className={cx('line-breaker')} />
        <div className={cx('gray-block')} />
        <div className={cx('gray-block')} />
        <div className={cx('gray-block')} />
        <div className={cx('gray-block')} style={{ width: '40%' }} />
      </div>
    </div>
  </React.Fragment>
);

export default FakePost;
