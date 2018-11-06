import * as React from 'react';
import Header from 'src/components/base/Header';
import { connect } from 'react-redux';
import { StoreState } from 'src/store/modules';
import { Dispatch } from 'redux';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type Props = StateProps & DispatchProps;

class HeaderContainer extends React.Component<Props> {
  public render() {
    const { user } = this.props;
    return <Header user={user} />;
  }
}

const mapStateToProps = ({ user }: StoreState) => ({
  user: user.user && user.user,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(HeaderContainer);
