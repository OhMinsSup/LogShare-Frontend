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

  public onCommonMenur = () => {
    const { BaseActions, commonMenu } = this.props;

    if (commonMenu) {
      BaseActions.setCommonMenu(false);
    } else {
      BaseActions.setCommonMenu(true);
    }
  };

  public render() {
    const { user, width, match } = this.props;
    const { onMenu, onCommonMenur } = this;

    return (
      <Header
        user={user}
        width={width}
        path={match.path}
        menu={<UserMenuContainer />}
        commonMenu={<CommonMenuContainer />}
        onMenu={onMenu}
        onCommonMenur={onCommonMenur}
      />
    );
  }
}

const mapStateToProps = ({ user, base }: StoreState) => ({
  userMenu: base.user_menu.visible,
  width: base.window.width,
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
