import * as React from 'react';
import * as classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const styles = require('./PostTags.scss');
const cx = classNames.bind(styles);

const PostTags: React.StatelessComponent<{ tags: string[] }> = ({ tags }) => (
  <div className={cx('post-tags')}>
    {tags.map(t => (
      <Link to={`/tags/${t}`} key={t}>
        {t}
      </Link>
    ))}
  </div>
);

export default PostTags;
