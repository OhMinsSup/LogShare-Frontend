import * as React from 'react';
import UserHead from 'src/components/user/UserHead';
import UserNav from 'src/components/user/UserNav';
import { match } from 'react-router';
import { StoreState } from 'src/store/modules';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type OwnProps = { match: match<{ username: string }> };
type Props = StateProps & DispatchProps & OwnProps;

class UserHeadContainer extends React.Component<Props> {
  public render() {
    const {
      match: {
        url,
        params: { username },
      },
    } = this.props;
    return (
      <React.Fragment>
        <UserHead />
        <UserNav url={url} username={username} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: StoreState) => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(UserHeadContainer);
