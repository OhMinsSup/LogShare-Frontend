import * as React from 'react';
import * as classNames from 'classnames/bind';
import { Doc } from 'codemirror';
import DropImage from '../DropImage';
import UploadMask from '../UploadMask';

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
  insertText: string | null;
  visible: boolean;
  onClearInsertText(): void;
  onChangeInput(name: string, value: string): void;
  onDragEnter(e: any): void;
  onDragLeave(e: any): void;
  onDrop(e: any): void;
  onPaste(file: any): void;
};

class WritePane extends React.Component<Props> {
  public editor: any = null;
  public codeMirror: any = null;
  public cursor: any = null;

  public onInsertText = () => {
    const { insertText, onClearInsertText } = this.props;
    const editors: any = this.codeMirror;
    const selection = editors.getSelection();
    console.log('gpgp');
    console.log(insertText);

    if (selection.length > 0) {
      editors.replaceSelection(insertText);
    } else {
      const doc = editors.getDoc();
      const cursor = doc.getCursor();

      const pos = {
        line: cursor.line,
        ch: cursor.ch,
      };
      doc.replaceRange(insertText, pos);
    }

    onClearInsertText();
  };

  public initializeEditor = () => {
    this.codeMirror = CodeMirror(this.editor, {
      mode: 'markdown',
      theme: 'monokai',
      lineNumbers: true,
      lineWrapping: true,
    });
    this.codeMirror.on('change', this.onChangeMarkdown);
  };

  public onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { onChangeInput } = this.props;
    const { value, name } = e.target;
    onChangeInput(name, value);
  };

  public onChangeMarkdown = (doc: Doc) => {
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

      if (this.props.insertText) {
        this.onInsertText();
      }
    }
  }

  public componentDidMount() {
    this.initializeEditor();
  }

  public render() {
    const { onChange } = this;
    const {
      title,
      onDragEnter,
      onDragLeave,
      onDrop,
      visible,
      onPaste,
    } = this.props;

    return (
      <React.Fragment>
        <div className={cx('write-pane')}>
          <input
            className={cx('title')}
            placeholder="제목을 입력하세요"
            name="title"
            autoFocus
            value={title}
            onChange={onChange}
          />
          <div className={cx('code-editor')} ref={ref => (this.editor = ref)} />
        </div>
        <DropImage
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          onPaste={onPaste}
        />
        <UploadMask visible={visible} />
      </React.Fragment>
    );
  }
}

export default WritePane;
