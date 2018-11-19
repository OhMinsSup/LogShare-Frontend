import * as React from 'react';
import * as classNames from 'classnames/bind';
import MarkdownRender from 'src/components/common/MarkdownRender';

const styles = require('./PreviewPane.scss');
const cx = classNames.bind(styles);

const PreviewPane: React.StatelessComponent<{
  markdown: string;
  title: string;
}> = ({ markdown, title }) => (
  <div className={cx('preview-pane')}>
    <h1 className={cx('title')}>{title}</h1>
    <div>
      <MarkdownRender markdown={markdown} />
    </div>
  </div>
);

export default PreviewPane;
