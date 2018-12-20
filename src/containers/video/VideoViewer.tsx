import * as React from 'react';
import MainViewer from 'src/components/video/MainViewer';
import SubViewer from 'src/components/video/SubViewer';
import { connect } from 'react-redux';
import { StoreState } from 'src/store/modules';
import { Dispatch, bindActionCreators } from 'redux';
import { videoCreators } from 'src/store/modules/video';
import { match } from 'react-router';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type OwnProps = { match: match<{ tag: string; id: string; username: string }> };
type Props = StateProps & DispatchProps & OwnProps;

class VideoViewer extends React.Component<Props> {
  public initialize = () => {
    const {
      VideoActions,
      match: {
        params: { id },
      },
    } = this.props;

    VideoActions.getVideo({ videoId: id });
    VideoActions.sideVideos();
  };

  public componentDidMount() {
    this.initialize();
  }

  public componentDidUpdate(preProps: Props) {
    if (preProps.match.params.id !== this.props.match.params.id) {
      this.initialize();
    }
  }

  public render() {
    const { side_videos, side_loading, main_video, logged } = this.props;
    return (
      <React.Fragment>
        <MainViewer main_video={main_video} logged={logged} />
        <SubViewer videos={side_videos} side_loading={side_loading} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ video, user }: StoreState) => ({
  side_videos: video.side_videos,
  side_loading: video.side_loading,
  main_video: video.main_video,
  logged: !!user.user,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  VideoActions: bindActionCreators(videoCreators, dispatch),
});

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(VideoViewer);
