import * as React from 'react';
import { connect } from 'react-redux';
import { StoreState } from 'src/store/modules';
import { Dispatch, bindActionCreators } from 'redux';
import storage from 'src/lib/storage';
import { userCreators } from 'src/store/modules/user';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type Props = StateProps & DispatchProps;

class Core extends React.Component<Props> {
  public checkUser = () => {
    const authResult = storage.get('__log_share__');
    const { UserActions } = this.props;

    if (!authResult) {
      UserActions.process(null);
      return;
    }

    UserActions.process({ authResult });
  };

  public initialize = () => {
    this.checkUser();
  };

  public componentDidMount() {
    this.initialize();
  }

  public render() {
    return null;
  }
}

const mapStateToProps = ({  }: StoreState) => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  UserActions: bindActionCreators(userCreators, dispatch),
});

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(Core);
