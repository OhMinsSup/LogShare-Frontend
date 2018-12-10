import * as React from 'react';
import * as classNames from 'classnames/bind';
import CircularProgressbar from 'react-circular-progressbar';
import ModalWrapper from 'src/components/common/ModalWrapper';
import Button from 'src/components/common/Button';
import { MdVideoLibrary } from 'react-icons/md';
import TextareaAutosize from 'react-autosize-textarea';

const styles = require('./UploadModal.scss');
const cx = classNames.bind(styles);

const InputItem: React.StatelessComponent<{
  title: string;
  type: 'input' | 'option';
}> = ({ title, type }) => (
  <div className={cx('input-item')}>
    <label className={cx('input-title')}>
      <div className={cx('title')}>{title}</div>{' '}
      {type === 'input' ? (
        <div className={cx('input')}>
          <span>
            <TextareaAutosize placeholder="태스트" />
          </span>
        </div>
      ) : (
        <select className={cx('select')}>
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
          <option value="vw">VW</option>
          <option value="audi" selected>
            Audi
          </option>
        </select>
      )}
    </label>
  </div>
);

type Props = {
  open: boolean;
  onUploadModal(): void;
};

type State = {};

class UploadModal extends React.Component<Props, State> {
  public render() {
    const { open, onUploadModal } = this.props;

    return (
      <ModalWrapper open={open}>
        <div className={cx('upload-modal')}>
          <div className={cx('wrapper')}>
            <div className={cx('header')}>
              <div className={cx('upload-title')}>
                <h3>동영상 업로드</h3>
              </div>
              <div className={cx('upload-button')}>
                <Button theme="default">썸네일</Button>
                <Button theme="default">업로드</Button>
              </div>
            </div>
            <div className={cx('content')}>
              <div className={cx('wrapper')}>
                <div className={cx('left-content')}>
                  <div className={cx('inner')}>
                    <div className={cx('content')}>
                      <MdVideoLibrary />
                    </div>
                    <div className={cx('progress-bar')}>
                      <CircularProgressbar
                        className={cx('progress')}
                        strokeWidth={4}
                        percentage={66}
                        text={`${66}%`}
                      />
                    </div>
                  </div>
                </div>
                <div className={cx('right-content')}>
                  <div className={cx('inner')}>
                    <div className={cx('content')}>
                      <InputItem title="제목" type="input" />
                      <InputItem title="설명" type="input" />
                      <InputItem title="카테고리" type="option" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={cx('button-area')}>
              <Button theme="default" onClick={onUploadModal}>
                취소
              </Button>
              <Button theme="default">작성</Button>
            </div>
          </div>
        </div>
      </ModalWrapper>
    );
  }
}

export default UploadModal;
