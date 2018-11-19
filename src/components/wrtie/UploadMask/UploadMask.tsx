import * as React from 'react';
import * as classNames from 'classnames/bind';
import { MdCloudUpload } from 'react-icons/md';

const styles = require('./UploadMask.scss');
const cx = classNames.bind(styles);

const UploadMask: React.StatelessComponent<{
  visible: boolean;
}> = ({ visible }) => {
  if (!visible) return null;
  return (
    <div className={cx('upload-mask')}>
      <MdCloudUpload />
      <h3>파일을 드래그하여 업로드 하세요</h3>
    </div>
  );
};

export default UploadMask;
