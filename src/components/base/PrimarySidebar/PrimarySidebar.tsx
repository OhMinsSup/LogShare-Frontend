import * as React from 'react';
import * as classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { MdLabel } from 'react-icons/md';

const styles = require('./PrimarySidebar.scss');
const cx = classNames.bind(styles);

const PrimarySidebar = () => (
  <div className={cx('primary-sidebar')}>
    <div className={cx('header')}>
      <div className={cx('wrapper')}>
        <MdLabel />
        <span>전체 태그</span>
      </div>
    </div>
    <div className={cx('contents')}>
      <Link className={cx('tag-item')} to={`/tags/name`}>
        <div className={cx('name')}>태그</div>
        <div className={cx('counts')}>5</div>
      </Link>
    </div>
  </div>
);

export default PrimarySidebar;
