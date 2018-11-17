import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import * as queryString from 'query-string';
import { StoreState } from 'src/store/modules';
import { Location, History } from 'history';
import { authCreators } from 'src/store/modules/auth';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type OwnProps = { location: Location; history: History };
type Props = StateProps & DispatchProps & OwnProps;

class Callback extends React.Component<Props> {
  public initialize = () => {
    const query = queryString.parse(this.props.location.search);
    const { next, type, key } = query;

    if (!type || !key) {
      return;
    }

    const { AuthActions, history } = this.props;
    AuthActions.callbackSocial({
      provider: type as string,
      next: next as string,
      history,
    });
  };

  public componentDidMount() {
    this.initialize();
  }

  public render() {
    return null;
  }
}

const mapStateToProps = (state: StoreState) => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  AuthActions: bindActionCreators(authCreators, dispatch),
});

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(Callback);
