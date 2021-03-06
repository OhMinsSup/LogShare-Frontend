import * as React from 'react';
import * as classNames from 'classnames/bind';
import { MdRemoveCircle } from 'react-icons/md';

const styles = require('./InputTags.scss');
const cx = classNames.bind(styles);

type Props = {
  tags: string[];
  onInsert(tag: string): void;
  onRemove(tag: string): void;
};

type State = {
  input: string;
};

const Tag: React.StatelessComponent<{
  name: string;
  onRemove(tag: string): void;
}> = ({ name, onRemove }) => (
  <div className={cx('tag')}>
    <div className={cx('text')}>{name}</div>
    <div className={cx('remove')} onClick={() => onRemove(name)}>
      <MdRemoveCircle />
    </div>
  </div>
);

class InputTags extends React.Component<Props, State> {
  public tags: any = null;

  public state = {
    input: '',
  };

  public onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      input: e.target.value,
    });
  };

  public onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (['Enter', ','].indexOf(e.key) !== -1) {
      this.onButtonClick();
      e.preventDefault();
    }
  };

  public onButtonClick = () => {
    const { input } = this.state;
    const { onInsert } = this.props;
    onInsert(input.replace(',', ''));
    this.setState({
      input: '',
    });
  };

  public renderTags = () => {
    const { tags, onRemove } = this.props;
    return tags.map(tag => <Tag key={tag} name={tag} onRemove={onRemove} />);
  };

  public render() {
    const { onButtonClick, onChange, onKeyUp } = this;
    const { input } = this.state;
    return (
      <div className={cx('input-tags')}>
        <div className={cx('input-button')}>
          <input
            placeholder="태그를 입력하세요"
            value={input}
            onChange={onChange}
            onKeyUp={onKeyUp}
          />
          <div
            className={cx('button', 'util', 'flex-center')}
            onClick={onButtonClick}
          >
            등록
          </div>
        </div>
        <div
          id="tags"
          className={cx('tags')}
          ref={ref => {
            this.tags = ref;
          }}
        >
          {this.renderTags()}
        </div>
      </div>
    );
  }
}

export default InputTags;
