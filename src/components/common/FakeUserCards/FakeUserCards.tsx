import * as React from 'react';
import * as classNames from 'classnames/bind';
import { createArray } from 'src/lib/common';

const styles = require('./FakeUserCards.scss');
const cx = classNames.bind(styles);

const FakeUserCard = () => (
  <div className={cx('fake-user-card')}>
    <div className={cx('profile-bg')} />
    <div className={cx('profile-content')}>
      <div className={cx('thumbnail')} />
      <div className={cx('info')}>
        <div className={cx('text')} />
      </div>
    </div>
  </div>
);

const FakeUserCards: React.StatelessComponent<{ users: any[] }> = ({
  users,
}) => (
  <div className={cx('fake-user-cards')}>
    {createArray(users.length === 0 ? 10 : users.length).map(num => (
      <FakeUserCard key={num} />
    ))}
  </div>
);

export default FakeUserCards;
