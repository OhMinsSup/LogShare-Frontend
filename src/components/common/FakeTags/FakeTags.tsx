import * as React from 'react';
import * as classNames from 'classnames/bind';
import { createArray } from 'src/lib/common';

const styles = require('./FakeTags.scss');
const cx = classNames.bind(styles);

const FakeTags: React.StatelessComponent<{
  tags: any[];
}> = ({ tags }) => (
  <div className={cx('fake-sidebar')}>
    <div className={cx('header')} />
    <div className={cx('separator')} />
    <div className={cx('contents')}>
      {createArray(tags.length === 0 ? 10 : tags.length).map(tag => (
        <div key={tag} className={cx('tag-item')} />
      ))}
    </div>
  </div>
);

export default FakeTags;
