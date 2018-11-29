import * as React from 'react';
import * as classNames from 'classnames/bind';
import UserCard from '../UserCard';

const styles = require('./UserCardList.scss');
const cx = classNames.bind(styles);

const UserCardList = () => {
  return (
    <div className={cx('user-card-list')}>
      <UserCard />
      <UserCard />
      <UserCard />
      <UserCard />
      <UserCard />
      <UserCard />
      <UserCard />
      <UserCard />
      <UserCard />
      <UserCard />
      <UserCard />
      <UserCard />
      <UserCard />
      <UserCard />
      <UserCard />
      <UserCard />
      <UserCard />
      <UserCard />
      <UserCard />
      <UserCard />
      <UserCard />
      <UserCard />
    </div>
  );
};

export default UserCardList;
