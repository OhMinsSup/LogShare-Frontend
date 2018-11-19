import * as React from 'react';

type Props = {
  onDragEnter(e: any): void;
  onDragLeave(e: any): void;
  onDrop(e: any): void;
  onPaste(file: any): void;
};

class DropImage extends React.Component<Props> {
  public onDragOver = (e: any) => {
    e.preventDefault();
  };

  public onPaste = (e: any) => {
    const { items } = e.clipboardData || e.originalEvent.clipboardData;
    if (items.length === 0) return;
    const fileItem = [...items].filter(item => item.kind === 'file')[0];
    if (!fileItem || !fileItem.getAsFile) return;
    const file = fileItem.getAsFile();
    this.props.onPaste(file);
    e.preventDefault();
  };

  public applyListeners = () => {
    const { onDragEnter, onDragLeave, onDrop } = this.props;
    if (window) {
      window.addEventListener('drop', onDrop);
      window.addEventListener('dragenter', onDragEnter);
      window.addEventListener('dragleave', onDragLeave);
      window.addEventListener('dragover', this.onDragOver);
    }
    if (document && document.body) {
      document.body.addEventListener('paste', this.onPaste);
    }
  };

  public removeListeners = () => {
    const { onDragEnter, onDragLeave, onDrop } = this.props;
    if (window) {
      window.removeEventListener('drop', onDrop);
      window.removeEventListener('dragenter', onDragEnter);
      window.removeEventListener('dragleave', onDragLeave);
      window.removeEventListener('dragover', this.onDragOver);
    }
    if (document && document.body) {
      document.body.removeEventListener('paste', this.onPaste);
    }
  };

  public componentDidMount() {
    this.applyListeners();
  }

  public componentWillUnmount() {
    this.removeListeners();
  }

  public render() {
    return <div />;
  }
}

export default DropImage;
