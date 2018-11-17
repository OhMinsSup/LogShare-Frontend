import * as React from 'react';
import * as classNames from 'classnames/bind';
import { Doc } from 'codemirror';

let CodeMirror: any = null;

const isBrowser = process.env.APP_ENV === 'browser';
if (isBrowser) {
  CodeMirror = require('codemirror');
  require('codemirror/mode/markdown/markdown');
  require('codemirror/mode/javascript/javascript');
  require('codemirror/mode/jsx/jsx');
  require('codemirror/mode/css/css');
  require('codemirror/mode/shell/shell');
  require('codemirror/lib/codemirror.css');
  require('codemirror/theme/monokai.css');
}

const styles = require('./WritePane.scss');
const cx = classNames.bind(styles);

type Props = {
  title: string;
  markdown: string;
  onChangeInput(name: string, value: string): any;
};

class WritePane extends React.Component<Props> {
  public editor: any = null;
  public codeMirror: any = null;
  public cursor: any = null;

  public initializeEditor = () => {
    this.codeMirror = CodeMirror(this.editor, {
      mode: 'markdown',
      theme: 'monokai',
      lineNumbers: true,
      lineWrapping: true,
    });
    this.codeMirror.on('change', this.handleChangeMarkdown);
  };

  public handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { onChangeInput } = this.props;
    const { value, name } = e.target;
    onChangeInput(name, value);
  };

  public handleChangeMarkdown = (doc: Doc) => {
    const { onChangeInput } = this.props;
    this.cursor = doc.getCursor();
    let name = 'body';
    let value = doc.getValue();
    onChangeInput(name, value);
  };

  public componentDidUpdate(prevProps: Props) {
    if (prevProps.markdown !== this.props.markdown) {
      const { codeMirror, cursor } = this;
      if (!codeMirror) return;
      codeMirror.setValue(this.props.markdown);

      if (!cursor) return;
      codeMirror.setCursor(cursor);
    }
  }

  public componentDidMount() {
    this.initializeEditor();
  }

  public render() {
    const { handleChange } = this;
    const { title } = this.props;

    return (
      <div className={cx('write-pane')}>
        <input
          className={cx('title')}
          placeholder="제목을 입력하세요"
          name="title"
          autoFocus
          value={title}
          onChange={handleChange}
        />
        <div className={cx('code-editor')} ref={ref => (this.editor = ref)} />
      </div>
    );
  }
}

export default WritePane;
