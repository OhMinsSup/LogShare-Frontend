import * as React from 'react';
import * as classNames from 'classnames/bind';

const styles = require('./PostComment.scss');
const cx = classNames.bind(styles);

type Props = {};

class PostComment extends React.Component<Props> {
  public render() {
    const {} = this;
    return <div className={cx('post-comment')}>oooo</div>;
  }
}

export default PostComment;
