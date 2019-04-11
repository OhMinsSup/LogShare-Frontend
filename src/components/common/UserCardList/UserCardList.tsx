import * as React from 'react';
import * as classNames from 'classnames/bind';
import UserCard from '../UserCard';
import { UsersSubState } from 'src/store/modules/list/users';

const styles = require('./UserCardList.scss');
const cx = classNames.bind(styles);

const UserCardList: React.StatelessComponent<{
  users: UsersSubState[];
  onClick(username: string): void;
}> = ({ users, onClick }) => {
  const usersList = users.map((user, index) => {
    const { username, shortBio, thumbnail, cover } = user;
    console.log(user);

    return (
      <UserCard
        key={index}
        username={username}
        thumbnail={thumbnail}
        shortBio={shortBio}
        onClick={onClick}
        cover={cover}
      />
    );
  });
  return <div className={cx('user-card-list')}>{usersList}</div>;
};

export default UserCardList;
