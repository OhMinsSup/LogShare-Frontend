import * as React from 'react';
import UploadModal from 'src/components/video/UploadModal';
import { connect } from 'react-redux';
import { StoreState } from 'src/store/modules';
import { Dispatch, bindActionCreators } from 'redux';
import { baseCreators } from 'src/store/modules/base';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type Props = StateProps & DispatchProps;

class UploadModalContainer extends React.Component<Props> {
  public onUploadModal = () => {
    const { BaseActions } = this.props;

    BaseActions.setUploadModal(false);
  };

  public render() {
    const { upload_modal } = this.props;

    return (
      <UploadModal open={upload_modal} onUploadModal={this.onUploadModal} />
    );
  }
}

const mapStateToProps = ({ base }: StoreState) => ({
  upload_modal: base.upload_modal.visible,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  BaseActions: bindActionCreators(baseCreators, dispatch),
});

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(UploadModalContainer);
