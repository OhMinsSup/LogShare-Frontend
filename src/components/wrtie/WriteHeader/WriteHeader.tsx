import * as React from 'react';
import * as classNames from 'classnames/bind';
import { MdArrowBack } from 'react-icons/md';
import { FaEllipsisV } from 'react-icons/fa';
import { IoMdImage } from 'react-icons/io';

const styles = require('./WriteHeader.scss');
const cx = classNames.bind(styles);

const WriteHeader: React.StatelessComponent<{
  isEdit: boolean;
  onGoBack(): void;
  onSubmitBox(): void;
  onUploadClick(): void;
  onSubmit(): void;
}> = ({ onGoBack, onSubmitBox, onUploadClick, onSubmit, isEdit }) => (
  <div className={cx('write-header')}>
    <MdArrowBack className={cx('back-icon')} onClick={onGoBack} />
    <div className={cx('actions')}>
      <button className={cx('upload-image')} onClick={onUploadClick}>
        <IoMdImage />
        <div className={cx('btn-text')}>업로드</div>
      </button>
      <div
        className={cx('button', isEdit ? 'edit' : 'submit')}
        onClick={onSubmit}
      >
        {isEdit ? '업데이트' : '작성하기'}
      </div>
      <div className={cx('more')} onClick={onSubmitBox}>
        <FaEllipsisV />
      </div>
    </div>
  </div>
);

export default WriteHeader;
