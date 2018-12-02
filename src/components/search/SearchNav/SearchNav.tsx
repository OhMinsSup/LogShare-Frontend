import * as React from 'react';
import * as classNames from 'classnames/bind';

const styles = require('./SearchNav.scss');
const cx = classNames.bind(styles);

const SearchNavItem: React.StatelessComponent<{
  text: string;
  active: boolean;
  type: 'post' | 'user';
  onTab(type: 'post' | 'user'): void;
}> = ({ text, active, type, onTab }) => {
  return (
    <div className={cx('nav-item', { active })} onClick={() => onTab(type)}>
      <div className={cx('text')}>{text}</div>
    </div>
  );
};

SearchNavItem.defaultProps = {
  active: false,
};

const SearchNav: React.StatelessComponent<{
  type: 'post' | 'user';
  onTab(type: 'post' | 'user'): void;
}> = ({ type, onTab }) => {
  return (
    <div className={cx('search-nav')}>
      <SearchNavItem
        text="포스트"
        active={type === 'post'}
        type="post"
        onTab={onTab}
      />
      <SearchNavItem
        text="사용자"
        active={type === 'user'}
        type="user"
        onTab={onTab}
      />
    </div>
  );
};

export default SearchNav;
