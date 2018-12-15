import * as React from 'react';
import * as classNames from 'classnames/bind';
import ModalWrapper from 'src/components/common/ModalWrapper';
import Button from 'src/components/common/Button';
import { MdVideoLibrary } from 'react-icons/md';
import TextareaAutosize from 'react-autosize-textarea';

const styles = require('./UploadModal.scss');
const cx = classNames.bind(styles);

const InputItem: React.StatelessComponent<{
  title: string;
  value: string;
  placeholder: string;
  name: 'title' | 'description' | 'category';
  type: 'input' | 'option';
  onChangeInput?(e: React.ChangeEvent<HTMLTextAreaElement>): void;
  onChangeSelect?(e: React.ChangeEvent<HTMLSelectElement>): void;
}> = ({
  title,
  type,
  onChangeInput,
  name,
  value,
  onChangeSelect,
  placeholder,
}) => (
  <div className={cx('input-item')}>
    <label className={cx('input-title')}>
      <div className={cx('title')}>{title}</div>{' '}
      {type === 'input' ? (
        <div className={cx('input')}>
          <span>
            <TextareaAutosize
              name={name}
              value={value}
              placeholder={placeholder}
              onChange={onChangeInput}
            />
          </span>
        </div>
      ) : (
        <select
          placeholder={placeholder}
          className={cx('select')}
          name={name}
          value={value}
          onChange={onChangeSelect}
        >
          <option value="개발">개발</option>
          <option value="사진">사진</option>
          <option value="비즈니스">비즈니스</option>
          <option value="음악">음악</option>
          <option value="디자인">디자인</option>
          <option value="자기개발">자기개발</option>
          <option value="사무">사무</option>
          <option value="생활">생활</option>
          <option value="뷰티">뷰티</option>
          <option value="기타">기타</option>
        </select>
      )}
    </label>
  </div>
);

type Props = {
  thumbnail?: string;
  open: boolean;
  loding: boolean;
  onUploadModal(): void;
  onUploadClick(type: 'thumbnail' | 'video'): void;
  onSubmit(title: string, description: string, category: string): void;
};

type State = {
  title: string;
  description: string;
  category: string;
};

class UploadModal extends React.Component<Props, State> {
  public constructor(props: Props) {
    super(props);

    this.state = {
      title: '',
      description: '',
      category: '개발',
    };
  }

  public onChangeInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value, name } = e.target;

    this.setState<any>({
      [name]: value,
    });
  };

  public onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value, name } = e.target;

    this.setState<any>({
      [name]: value,
    });
  };

  public onClick = () => {
    const { onSubmit } = this.props;
    const { title, description, category } = this.state;

    onSubmit(title, description, category);
  };

  public render() {
    const {
      open,
      onUploadModal,
      onUploadClick,
      thumbnail,
      loding,
    } = this.props;
    const { title, description, category } = this.state;

    return (
      <ModalWrapper open={open}>
        <div className={cx('upload-modal')}>
          <div className={cx('wrapper')}>
            <div className={cx('header')}>
              <div className={cx('upload-title')}>
                <h3>동영상 업로드</h3>
              </div>
              <div className={cx('upload-button')}>
                <Button
                  theme="default"
                  onClick={() => onUploadClick('thumbnail')}
                >
                  썸네일
                </Button>
                <Button theme="default" onClick={() => onUploadClick('video')}>
                  업로드
                </Button>
              </div>
            </div>
            <div className={cx('content')}>
              <div className={cx('wrapper')}>
                <div className={cx('left-content')}>
                  <div className={cx('inner')}>
                    <div className={cx('content')}>
                      {thumbnail ? <img src={thumbnail} /> : <MdVideoLibrary />}
                    </div>
                    {thumbnail ? null : (
                      <div className={cx('progress-bar')}>
                        <div className={cx('progress')}>
                          {loding ? (
                            <div className={cx('spinner')}>
                              <div className={cx('dot1')} />
                              <div className={cx('dot2')} />
                            </div>
                          ) : null}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className={cx('right-content')}>
                  <div className={cx('inner')}>
                    <div className={cx('content')}>
                      <InputItem
                        title="제목"
                        type="input"
                        name="title"
                        placeholder="제목을 입력해주세요"
                        value={title}
                        onChangeInput={this.onChangeInput}
                      />
                      <InputItem
                        title="설명"
                        type="input"
                        name="description"
                        placeholder="내용을 입력해주세요"
                        value={description}
                        onChangeInput={this.onChangeInput}
                      />
                      <InputItem
                        title="카테고리"
                        type="option"
                        name="category"
                        placeholder="카테고리를 선택해주세요"
                        value={category}
                        onChangeSelect={this.onChangeSelect}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={cx('button-area')}>
              <Button theme="default" onClick={onUploadModal}>
                취소
              </Button>
              <Button theme="default" onClick={this.onClick}>
                작성
              </Button>
            </div>
          </div>
        </div>
      </ModalWrapper>
    );
  }
}

export default UploadModal;
