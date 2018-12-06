import * as React from 'react';
import * as classNames from 'classnames/bind';
import { MdChat } from 'react-icons/md';

const styles = require('./ChatbotBox.scss');
const cx = classNames.bind(styles);

type Props = {};

type State = {
  visible: boolean;
};

class ChatbotBox extends React.Component<Props, State> {
  public state: State = {
    visible: false,
  };

  public onClick = () => {
    const { visible } = this.state;
    this.setState({
      visible: visible ? false : true,
    });
  };

  public render() {
    return (
      <React.Fragment>
        {this.state.visible ? (
          <div />
        ) : (
          <div className={cx('chat-bot')} onClick={this.onClick}>
            <div className={cx('wrapper')}>
              <MdChat className={cx('icon')} />
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default ChatbotBox;
