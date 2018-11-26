import * as React from 'react';
import Sidebar from 'src/components/base/Sidebar/Sidebar';
import { connect } from 'react-redux';
import { StoreState } from 'src/store/modules';
import { Dispatch, bindActionCreators } from 'redux';
import { baseCreators } from 'src/store/modules/base';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type OwnProps = { url: string };
type Props = StateProps & DispatchProps & OwnProps;

class SidebarContainer extends React.Component<Props> {
  public onOutSideClick = (e: any) => {
    const { BaseActions } = this.props;
    BaseActions.setSideBar(false);
  };

  public componentWillMount() {
    document.addEventListener('click', this.onOutSideClick);
  }

  public render() {
    const { url, sideBar, width } = this.props;
    if (!sideBar && width <= 890) return null;

    return <Sidebar url={url} />;
  }
}

const mapStateToProps = ({ base }: StoreState) => ({
  sideBar: base.side_bar.visible,
  width: base.window.width,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  BaseActions: bindActionCreators(baseCreators, dispatch),
});

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(SidebarContainer);
