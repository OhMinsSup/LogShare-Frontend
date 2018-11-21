import * as React from 'react';
import * as classNames from 'classnames/bind';
import MarkdownRender from '../../common/MarkdownRender';

const styles = require('./PostContent.scss');
const cx = classNames.bind(styles);

const PostContent: React.StatelessComponent<{
  body: string;
  post_thumbnail: string | null;
}> = ({ body, post_thumbnail }) => (
  <div className={cx('post-content')}>
    {post_thumbnail && (
      <div className={cx('post-thumbnail')}>
        <img src={post_thumbnail} alt="post-thumbnail" />
      </div>
    )}
    <div className={cx('contents')}>
      <MarkdownRender markdown={body} />
    </div>
  </div>
);

export default PostContent;
