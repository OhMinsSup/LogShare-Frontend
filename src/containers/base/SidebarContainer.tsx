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
  public render() {
    const { url } = this.props;

    return <Sidebar url={url} />;
  }
}

const mapStateToProps = ({ base }: StoreState) => ({
  width: base.window.width,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  BaseActions: bindActionCreators(baseCreators, dispatch),
});

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(SidebarContainer);
