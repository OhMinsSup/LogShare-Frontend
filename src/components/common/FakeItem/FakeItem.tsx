import * as React from 'react';
import * as classNames from 'classnames/bind';
import { createArray } from 'src/lib/common';

const styles = require('./FakeItem.scss');
const cx = classNames.bind(styles);

const FakeItem: React.StatelessComponent<{
  item: any[];
}> = ({ item }) => (
  <div className={cx('fake-sidebar')}>
    <div className={cx('header')} />
    <div className={cx('separator')} />
    <div className={cx('contents')}>
      {createArray(item.length === 0 ? 10 : item.length).map(item => (
        <div key={item} className={cx('item')} />
      ))}
    </div>
  </div>
);

export default FakeItem;
