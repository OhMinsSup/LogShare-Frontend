import * as React from 'react';
import UploadModal from 'src/components/video/UploadModal';
import { connect } from 'react-redux';
import { StoreState } from 'src/store/modules';
import { Dispatch, bindActionCreators } from 'redux';
import { baseCreators } from 'src/store/modules/base';
import { videoCreators } from 'src/store/modules/video';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type Props = StateProps & DispatchProps;

class UploadModalContainer extends React.Component<Props> {
  public onUploadModal = () => {
    const { BaseActions } = this.props;

    BaseActions.setUploadModal(false);
  };

  public uploadVideo = (file: File, type: 'thumbnail' | 'video') => {
    const { VideoActions } = this.props;

    if (type === 'video') {
      VideoActions.createUploadUrlVideoUpload({ file });
    } else if (type === 'thumbnail') {
      VideoActions.createUploadUrlVideoThumbnail({ file });
    }
  };

  public onUploadClick = (type: 'thumbnail' | 'video') => {
    const upload = document.createElement('input');
    upload.type = 'file';
    upload.onchange = e => {
      if (!upload.files) return;
      const file = upload.files[0];
      this.uploadVideo(file, type);
    };
    upload.click();
  };

  public onSubmit = (title: string, description: string, category: string) => {
    const {
      VideoActions,
      BaseActions,
      url_thumbnail,
      url_video,
      time,
      format,
      thumbnail,
    } = this.props;

    VideoActions.submit({
      title,
      description,
      category,
      thumbnail: url_thumbnail ? url_thumbnail : thumbnail,
      url: url_video,
      format,
      time,
    });

    BaseActions.setUploadModal(false);
  };

  public render() {
    const {
      upload_modal,
      progres_loding,
      thumbnail,
      url_thumbnail,
    } = this.props;
    return (
      <UploadModal
        thumbnail={url_thumbnail ? url_thumbnail : thumbnail}
        open={upload_modal}
        loding={progres_loding}
        onSubmit={this.onSubmit}
        onUploadClick={this.onUploadClick}
        onUploadModal={this.onUploadModal}
      />
    );
  }
}

const mapStateToProps = ({ base, video }: StoreState) => ({
  url_thumbnail: video.thumbnail.url,
  thumbnail: video.video.thumbnail,
  format: video.video.format,
  time: video.video.time,
  url_video: video.video.url,
  upload_modal: base.upload_modal.visible,
  progres_loding: base.progress_bar.loding,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  BaseActions: bindActionCreators(baseCreators, dispatch),
  VideoActions: bindActionCreators(videoCreators, dispatch),
});

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(UploadModalContainer);
