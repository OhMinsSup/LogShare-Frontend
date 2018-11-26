import * as React from 'react';
import * as classNames from 'classnames/bind';

const styles = require('./SubmitBox.scss');
const cx = classNames.bind(styles);

const SubmitBox: React.StatelessComponent<{
  visible: boolean;
  inputTags: React.ReactNode;
  previewThumbnail: React.ReactNode;
  onClick(): void;
}> = ({ visible, inputTags, previewThumbnail, onClick }) => {
  return (
    <div className={cx('submit-box', visible ? 'appear' : 'disappear')}>
      <div className={cx('sections')}>
        <section>
          <div className={cx('section-title')}>태그 설정</div>
          {inputTags}
        </section>
        <section>
          <div className={cx('section-title')}>썸네일 지정</div>
          {previewThumbnail}
        </section>
      </div>
      <div className={cx('footer')}>
        <div className={cx('buttons')}>
          <button className={cx('white')}>임시저장</button>
          <button className={cx('white')} onClick={onClick}>
            확인
          </button>
        </div>
      </div>
    </div>
  );
};
export default SubmitBox;
