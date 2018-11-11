import * as React from 'react';
import LoginForm from 'src/components/auth/LoginForm';
import { Dispatch, bindActionCreators } from 'redux';
import { authCreators } from 'src/store/modules/auth';
import { StoreState } from 'src/store/modules';
import { connect } from 'react-redux';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type Props = StateProps & DispatchProps;

class LoginFormContainer extends React.Component<Props> {
  public initialize = () => {
    const { AuthActions } = this.props;
    AuthActions.initial();
  };

  public componentDidMount() {
    this.initialize();
  }

  public render() {
    return <LoginForm />;
  }
}

const mapStateToProps = ({  }: StoreState) => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  AuthActions: bindActionCreators(authCreators, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginFormContainer);
