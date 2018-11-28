import * as React from 'react';
import Header from 'src/components/base/Header';
import { connect } from 'react-redux';
import { StoreState } from 'src/store/modules';
import { Dispatch, bindActionCreators } from 'redux';
import UserMenuContainer from './UserMenuContainer';
import CommonMenuContainer from './CommonMenuContainer';
import { baseCreators } from 'src/store/modules/base';
import { match } from 'react-router';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type OwnProps = { match: match<{ id: string }> };
type Props = StateProps & DispatchProps & OwnProps;

class HeaderContainer extends React.Component<Props> {
  public onMenu = () => {
    const { BaseActions, userMenu } = this.props;
    userMenu ? BaseActions.hideUserMenu() : BaseActions.showUserMenu();
  };

  public onSideBar = () => {
    const { BaseActions, commonMenu } = this.props;

    if (commonMenu) {
      BaseActions.setCommonMenu(false);
    } else {
      BaseActions.setCommonMenu(true);
    }
  };

  public render() {
    const { user } = this.props;
    const { onMenu, onSideBar } = this;

    return (
      <React.Fragment>
        <Header
          user={user}
          menu={<UserMenuContainer />}
          commonMenu={<CommonMenuContainer />}
          onMenu={onMenu}
          onSideBar={onSideBar}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ user, base }: StoreState) => ({
  userMenu: base.user_menu.visible,
  user: user.user && user.user,
  commonMenu: base.common_menu.visible,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  BaseActions: bindActionCreators(baseCreators, dispatch),
});

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(HeaderContainer);
