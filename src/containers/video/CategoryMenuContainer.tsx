import * as React from 'react';
import CategoryMenu from 'src/components/video/CategoryMenu';
import { connect } from 'react-redux';
import { StoreState } from 'src/store/modules';
import { Dispatch, bindActionCreators } from 'redux';
import { baseCreators } from 'src/store/modules/base';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type Props = StateProps & DispatchProps;

class CategoryMenuContainer extends React.Component<Props> {
  public render() {
    const { visible } = this.props;

    if (!visible) return null;

    return <CategoryMenu />;
  }
}

const mapStateToProps = ({ base }: StoreState) => ({
  visible: base.category.visible,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  BaseActions: bindActionCreators(baseCreators, dispatch),
});

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(CategoryMenuContainer);
