import * as React from 'react';
import * as classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { MdLabel } from 'react-icons/md';
import { TagsDataState } from 'src/store/modules/list/tags';

const styles = require('./PrimarySidebar.scss');
const cx = classNames.bind(styles);

const PrimarySidebar: React.StatelessComponent<{
  tags: TagsDataState[];
}> = ({ tags }) => (
  <div className={cx('primary-sidebar')}>
    <div className={cx('header')}>
      <div className={cx('wrapper')}>
        <MdLabel />
        <span>전체 태그</span>
      </div>
    </div>
    <div className={cx('contents')}>
      {tags.map(tag => {
        const { count, tagId, name } = tag;
        return (
          <Link key={tagId} className={cx('tag-item')} to={`/tags/${name}`}>
            <div className={cx('name')}>{name}</div>
            <div className={cx('counts')}>{count}</div>
          </Link>
        );
      })}
    </div>
  </div>
);

export default PrimarySidebar;
