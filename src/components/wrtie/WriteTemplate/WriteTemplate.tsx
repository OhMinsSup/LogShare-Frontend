import * as React from 'react';
import * as classNames from 'classnames/bind';

const styles = require('./WriteTemplate.scss');
const cx = classNames.bind(styles);

type Props = {
  header?: React.ReactNode;
  editor?: React.ReactNode;
  preview?: React.ReactNode;
};

type State = {
  leftPercentage: number;
};

class WriteTemplate extends React.Component<Props, State> {
  public state = {
    leftPercentage: 0.5,
  };

  public onMouseMove = (e: any) => {
    this.setState({
      leftPercentage: e.clientX / window.innerWidth,
    });
  };

  public onMouseUp = (e: any) => {
    document.body.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('mouseup', this.onMouseUp);
  };

  public onSeparatorMouseDown = (e: any) => {
    document.body.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('mouseup', this.onMouseUp);
  };

  public render() {
    const { header, editor, preview } = this.props;
    const { leftPercentage } = this.state;
    const { onSeparatorMouseDown } = this;

    const leftStyle = {
      flex: leftPercentage,
    };
    const rightStyle = {
      flex: 1 - leftPercentage,
    };

    const separatorStyle = {
      left: `${leftPercentage * 100}%`,
    };

    return (
      <div className={cx('write-template')}>
        {header}
        <div className={cx('panes')}>
          <div className={cx('pane', 'editor')} style={leftStyle}>
            {editor}
          </div>
          <div className={cx('pane', 'preview')} style={rightStyle}>
            {preview}
          </div>
          <div
            className={cx('separator')}
            style={separatorStyle}
            onMouseDown={onSeparatorMouseDown}
          />
        </div>
      </div>
    );
  }
}

export default WriteTemplate;
