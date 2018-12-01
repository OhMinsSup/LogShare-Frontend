import * as React from 'react';
import NoticeContent from 'src/components/notice/NoticeContent';
import { connect } from 'react-redux';
import { throttle } from 'lodash';
import { getScrollBottom } from 'src/lib/common';
import { Dispatch, bindActionCreators } from 'redux';
import { StoreState } from 'src/store/modules';
import { noticesCreators } from 'src/store/modules/list/notices';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type Props = StateProps & DispatchProps;

class NoticeViewer extends React.Component<Props> {
  public prev: string | null = null;

  public onScroll = throttle(() => {
    const scrollButton = getScrollBottom();
    if (scrollButton > 1000) return;
    this.prefetch();
  }, 250);

  public prefetch = () => {
    const { ListActions, messages, next } = this.props;
    if (!messages || messages.length === 0) return;

    if (this.props.prefetched) {
      ListActions.revealNoticesPrefetched();
    }

    if (next === this.prev) return;
    this.prev = next;

    ListActions.prefetchNotices({ next });
  };

  public initialize = () => {
    const { ListActions } = this.props;
    ListActions.getNotices();
  };

  public listenScroll = () => {
    window.addEventListener('scroll', this.onScroll);
  };

  public unlistenScroll = () => {
    window.removeEventListener('scroll', this.onScroll);
  };

  public componentDidMount() {
    this.initialize();
    this.listenScroll();
  }

  public componentWillUnmount() {
    this.unlistenScroll();
  }

  public render() {
    const { messages } = this.props;
    return <NoticeContent notices={messages} />;
  }
}

const mapStateToProps = ({ list }: StoreState) => ({
  messages: list.notices.notices.message,
  prefetched: list.notices.notices.prefetched,
  next: list.notices.notices.next,
  loading: list.notices.notices.loading,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  ListActions: bindActionCreators(noticesCreators, dispatch),
});

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(NoticeViewer);
