import * as React from 'react';
import NoticeModal from 'src/components/common/NoticeModal';
import { connect } from 'react-redux';
import { StoreState } from 'src/store/modules';
import { Dispatch, bindActionCreators } from 'redux';
import { noticeCreators } from 'src/store/modules/notice';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type Props = StateProps & DispatchProps;

class NoticeModalContainer extends React.Component<Props> {
  public onNotice = () => {
    const { NoticeActions, visible } = this.props;

    if (visible) {
      NoticeActions.setNoticeRoom(false);
    } else {
      NoticeActions.setNoticeRoom(true);
    }
  };

  public initialize = () => {
    const { NoticeActions } = this.props;
    NoticeActions.alreadyMessageList();
  };

  public componentDidMount() {
    this.initialize();
  }

  public componentDidUpdate(preProps: Props) {
    if (preProps.visible !== this.props.visible) {
      this.initialize();
    }
  }

  public render() {
    const { visible, noticeMessage, username } = this.props;
    if (!visible) return null;

    return (
      <NoticeModal
        username={username}
        notices={noticeMessage}
        onNotice={this.onNotice}
      />
    );
  }
}

const mapStateToProps = ({ notice, user }: StoreState) => ({
  username: user.user && user.user.username,
  logged: !!user.user,
  visible: notice.notice_modal.visible,
  noticeMessage: notice.noticeMessage,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  NoticeActions: bindActionCreators(noticeCreators, dispatch),
});

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(NoticeModalContainer);
