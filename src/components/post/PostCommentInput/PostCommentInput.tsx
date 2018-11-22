import * as React from 'react';
import * as classNames from 'classnames/bind';
import TextareaAutosize from 'react-autosize-textarea';
import Button from 'src/components/common/Button';

const styles = require('./PostCommentInput.scss');
const cx = classNames.bind(styles);

type Props = {
  showCancel?: boolean;
  replyTo?: string;
  editing?: boolean;
  defaultValue?: string;
  onCancel?(): void;
  onWriteComment?(text: string, replyTo?: string): void;
};

type State = {
  input: string;
  focused: boolean;
  waiting: boolean;
};

class PostCommentInput extends React.Component<Props, State> {
  public static defaulProps = {
    showCancel: false,
    onCancel: () => null,
    defaultValue: '',
  };

  public state = {
    input: '',
    focused: false,
    waiting: false,
  };

  public constructor(props: Props) {
    super(props);
    if (props.defaultValue) {
      this.state.input = props.defaultValue;
    }
  }

  public onFocus = () => {
    this.setState({
      focused: true,
    });
  };

  public onBlur = () => {
    this.setState({
      focused: false,
    });
  };

  public onChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const { value }: any = e.target;
    this.setState({
      input: value,
    });
  };

  public render() {
    const { showCancel, editing } = this.props;
    const { focused, input } = this.state;

    return (
      <div className={cx('post-comment-input')}>
        <TextareaAutosize
          className={cx('textarea')}
          rows={focused || input !== '' ? 4 : 1}
          maxRows={20}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onChange={this.onChange}
          value={input}
        />
        <div className={cx('button-wrapper')}>
          <Button theme="default" onClick={() => console.log('ds')}>
            {editing ? '수정하기' : '댓글 작성'}
          </Button>
          {showCancel && <Button theme="default">취소</Button>}
        </div>
      </div>
    );
  }
}

export default PostCommentInput;
