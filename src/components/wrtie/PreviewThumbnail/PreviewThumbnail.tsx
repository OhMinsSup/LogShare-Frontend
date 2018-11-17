import * as React from 'react';
import * as classNames from 'classnames/bind';
import { MdSync, MdFileUpload } from 'react-icons/md';

const styles = require('./PreviewThumbnail.scss');
const cx = classNames.bind(styles);

const PreviewThumbnail: React.StatelessComponent<{
  thumbnail: string | null;
  onUploadClick: () => void;
  onClearThumbnail: () => void;
}> = ({ thumbnail, onUploadClick, onClearThumbnail }) => (
  <div className={cx('preview-thumbnail')}>
    {thumbnail ? (
      <React.Fragment>
        <div className={cx('remove-wrapper')}>
          <button className={cx('remove')} onClick={onClearThumbnail}>
            제거
          </button>
        </div>
        <div className={cx('thumbnail-area')}>
          <img className={cx('full')} src={thumbnail} alt="post-thumbnail" />
          <div className={cx('overlay full')}>
            <button className={cx('white-button')} onClick={onUploadClick}>
              <MdSync />
              <div className={cx('text')}>변경</div>
            </button>
          </div>
        </div>
      </React.Fragment>
    ) : (
      <button
        className={cx('white-button', 'fullwidth')}
        onClick={onUploadClick}
      >
        <MdFileUpload />
        <div className={cx('text')}>업로드</div>
      </button>
    )}
  </div>
);

export default PreviewThumbnail;
