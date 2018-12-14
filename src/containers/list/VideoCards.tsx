import * as React from 'react';
import VideoCardList from 'src/components/video/VideoCardList';
import { connect } from 'react-redux';
import { throttle } from 'lodash';
import { StoreState } from 'src/store/modules';
import { Dispatch, bindActionCreators } from 'redux';
import { videosCreators } from 'src/store/modules/list/videos';
import { getScrollBottom } from 'src/lib/common';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type Props = StateProps & DispatchProps;

class VideoCards extends React.Component<Props> {
  public prev: string | null = null;

  public onScroll = throttle(() => {
    const scrollButton = getScrollBottom();
    if (scrollButton > 1000) return;
    this.prefetch();
  }, 250);

  public prefetch = () => {
    const { ListActions, videos, next } = this.props;
    if (!videos || videos.length === 0) return;

    if (this.props.prefetched) {
      ListActions.revealVideosPrefetched();
    }

    if (next === this.prev) return;
    this.prev = next;

    ListActions.prefetchVideos({ next });
  };

  public initialize = () => {
    const { ListActions } = this.props;
    ListActions.getVideos({ username: null });
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
    const { videos, loading } = this.props;

    return <VideoCardList videos={videos} loading={loading} />;
  }
}

const mapStateToProps = ({ list }: StoreState) => ({
  videos: list.videos.videos.video,
  prefetched: list.videos.videos.prefetched,
  next: list.videos.videos.next,
  loading: list.videos.videos.loading,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  ListActions: bindActionCreators(videosCreators, dispatch),
});

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(VideoCards);
