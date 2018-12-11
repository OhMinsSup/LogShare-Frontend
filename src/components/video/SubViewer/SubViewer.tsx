import * as React from 'react';
import * as classNames from 'classnames/bind';
import Video from 'src/components/common/Video';

const styles = require('./SubViewer.scss');
const cx = classNames.bind(styles);

const SubViewer = () => {
  return (
    <div className={cx('sub-viewer')}>
      <div className={cx('inner')}>
        <Video subViewer={true} />
        <Video subViewer={true} />
        <Video subViewer={true} />
        <Video subViewer={true} />
        <Video subViewer={true} />
        <Video subViewer={true} />
        <Video subViewer={true} />
        <Video subViewer={true} />
        <Video subViewer={true} />
        <Video subViewer={true} />
        <Video subViewer={true} />
      </div>
    </div>
  );
};

export default SubViewer;
