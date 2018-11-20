import * as React from 'react';
import * as classNames from 'classnames/bind';
import MarkdownRender from '../../common/MarkdownRender';
import { TocState } from 'src/store/modules/post';

const styles = require('./PostContent.scss');
const cx = classNames.bind(styles);

const PostContent: React.StatelessComponent<{
  body: string;
  post_thumbnail: string | null;
  onSetToc(toc: TocState[] | null): void;
  onActivateHeading(headingId: string): void;
}> = ({ body, onSetToc, onActivateHeading, post_thumbnail }) => (
  <div className={cx('post-content')}>
    {post_thumbnail && (
      <div className={cx('post-thumbnail')}>
        <img src={post_thumbnail} alt="post-thumbnail" />
      </div>
    )}
    <div className={cx('contents')}>
      <MarkdownRender
        markdown={body}
        onSetPostToc={onSetToc}
        OnSetActiveHeading={onActivateHeading}
      />
    </div>
  </div>
);

export default PostContent;
