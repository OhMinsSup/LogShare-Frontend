import * as React from 'react';
import WriteHeader from 'src/components/wrtie/WriteHeader';
import { History } from 'history';
import { connect } from 'react-redux';
import { StoreState } from 'src/store/modules';
import { Dispatch, bindActionCreators } from 'redux';
import { writeCreators } from 'src/store/modules/write';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type OwnProps = { history: History };
type Props = OwnProps & StateProps & DispatchProps;

class WriteHeaderContainer extends React.Component<Props> {
  public onSubmitBox = () => {
    const { WriteActions, open } = this.props;

    if (open) {
      WriteActions.hideWriteSubmit(false);
    } else {
      WriteActions.showWriteSubmit(true);
    }
  };

  public onGoBack = () => {
    const { history } = this.props;
    history.goBack();
  };

  public render() {
    const { onGoBack, onSubmitBox } = this;
    return <WriteHeader onGoBack={onGoBack} onSubmitBox={onSubmitBox} />;
  }
}

const mapStateToProps = ({ write }: StoreState) => ({
  open: write.submitBox.open,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  WriteActions: bindActionCreators(writeCreators, dispatch),
});

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(WriteHeaderContainer);
