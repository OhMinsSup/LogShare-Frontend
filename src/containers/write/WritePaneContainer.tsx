import * as React from 'react';
import WritePane from 'src/components/wrtie/WritePane';
import { Dispatch, bindActionCreators } from 'redux';
import { StoreState } from 'src/store/modules';
import { connect } from 'react-redux';
import { writeCreators } from 'src/store/modules/write';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type Props = StateProps & DispatchProps;

class WritePaneContainer extends React.Component<Props> {
  public onChangeInput = (name: string, value: string) => {
    const { WriteActions } = this.props;
    WriteActions.changeInput({ name, value });
  };

  public uploadImage = (file: File) => {
    const { WriteActions } = this.props;
    WriteActions.setUploadMask(true);
    if (!file) return;
    WriteActions.createUploadUrlPostImage({ file });
    WriteActions.setUploadMask(false);
  };

  public onDragEnter = (e: any) => {
    const { WriteActions } = this.props;
    e.preventDefault();
    console.log(e);
    setImmediate(() => {
      WriteActions.setUploadMask(true);
    });
  };

  public onDrop = (e: any) => {
    e.preventDefault();
    const { files } = e.dataTransfer;
    if (!files) return;
    this.uploadImage(files[0]);
  };

  public onDragLeave = (e: any) => {
    const { WriteActions } = this.props;
    e.preventDefault();
    if (!e.relatedTarget) WriteActions.setUploadMask(false);
  };

  public onPasteImage = (file: File) => {
    if (!file) return;
    this.uploadImage(file);
  };

  public onClearInsertText = () => {
    const { WriteActions } = this.props;
    WriteActions.setClearInsertText();
  };

  public render() {
    const { title, body, insertText, mask } = this.props;
    const {
      onChangeInput,
      onClearInsertText,
      onDragEnter,
      onDragLeave,
      onPasteImage,
      onDrop,
    } = this;
    return (
      <WritePane
        title={title}
        markdown={body}
        insertText={insertText}
        onClearInsertText={onClearInsertText}
        onChangeInput={onChangeInput}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onPaste={onPasteImage}
        visible={mask}
      />
    );
  }
}

const mapStateToProps = ({ write }: StoreState) => ({
  title: write.editor.title,
  body: write.editor.body,
  mask: write.setting.mask,
  insertText: write.setting.insertText,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  WriteActions: bindActionCreators(writeCreators, dispatch),
});

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(WritePaneContainer);
