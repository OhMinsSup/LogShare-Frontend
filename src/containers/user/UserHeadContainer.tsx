import * as React from 'react';
import UserHead from 'src/components/user/UserHead';
import UserNav from 'src/components/user/UserNav';
import { match } from 'react-router';
import { StoreState } from 'src/store/modules';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { userCreators } from 'src/store/modules/user';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type OwnProps = { match: match<{ username: string }> };
type Props = StateProps & DispatchProps & OwnProps;

class UserHeadContainer extends React.Component<Props> {
  public initialize = () => {
    const {
      UserActions,
      match: {
        params: { username },
      },
    } = this.props;

    UserActions.getUserProfile({ username });
  };

  public componentDidMount() {
    this.initialize();
  }

  public render() {
    const {
      match: {
        url,
        params: { username },
      },
      userProfile,
    } = this.props;

    return (
      <React.Fragment>
        <UserHead profile={userProfile} />
        <UserNav url={url} username={username} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ user }: StoreState) => ({
  userProfile: user.user_profile,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  UserActions: bindActionCreators(userCreators, dispatch),
});

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(UserHeadContainer);
