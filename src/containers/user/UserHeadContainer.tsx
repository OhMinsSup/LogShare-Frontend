import * as React from 'react';
import UserHead from 'src/components/user/UserHead';
import UserNav from 'src/components/user/UserNav';
import { match } from 'react-router';
import { StoreState } from 'src/store/modules';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { userCreators } from 'src/store/modules/user';
import { followCreators } from 'src/store/modules/follow';
import { baseCreators } from 'src/store/modules/base';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type OwnProps = { match: match<{ username: string }> };
type Props = StateProps & DispatchProps & OwnProps;

class UserHeadContainer extends React.Component<Props> {
  public initialize = () => {
    const {
      UserActions,
      FollowActions,
      match: {
        params: { username },
      },
    } = this.props;

    UserActions.getUserProfile({ username });
    FollowActions.checkExistsUserFollow({ username });
  };

  public onToggleProfile = () => {
    const { BaseActions } = this.props;

    BaseActions.setProfileUpdateModal(true);
  };

  public onToggleFollow = () => {
    const {
      follow,
      FollowActions,
      match: {
        params: { username },
      },
    } = this.props;

    if (follow) {
      FollowActions.unfollow({ username });
    } else {
      FollowActions.follow({ username });
    }
  };

  public componentDidUpdate(preProps: Props) {
    if (
      preProps.match.url !== this.props.match.url ||
      preProps.askProfile !== this.props.askProfile
    ) {
      this.initialize();
    }
  }

  public componentDidMount() {
    this.initialize();
  }

  public render() {
    const {
      match: {
        url,
        params: { username },
      },
      follow,
      currentUsername,
      userProfile,
    } = this.props;

    return (
      <React.Fragment>
        <UserHead
          profile={userProfile}
          follow={follow}
          currentUsername={currentUsername}
          onFollow={this.onToggleFollow}
          onProfile={this.onToggleProfile}
        />
        <UserNav url={url} username={username} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ user, follow, base }: StoreState) => ({
  currentUsername: user.user && user.user.username,
  userProfile: user.user_profile,
  follow: follow.follow,
  askProfile: user.askProfile,
  profileModal: base.profile_modal.visible,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  FollowActions: bindActionCreators(followCreators, dispatch),
  UserActions: bindActionCreators(userCreators, dispatch),
  BaseActions: bindActionCreators(baseCreators, dispatch),
});

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(UserHeadContainer);
