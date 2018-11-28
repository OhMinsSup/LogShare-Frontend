import * as React from 'react';
import PrimarySidebar from 'src/components/base/PrimarySidebar';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { StoreState } from 'src/store/modules';
import { tagsCreators } from 'src/store/modules/list/tags';
import FakeTags from 'src/components/common/FakeTags/FakeTags';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type Props = StateProps & DispatchProps;

class PrimarySidebarContainer extends React.Component<Props> {
  public initialize = () => {
    const { ListActions } = this.props;
    ListActions.getTags();
  };

  public componentDidMount() {
    this.initialize();
  }

  public render() {
    const { tags, loading } = this.props;
    if (loading) return <FakeTags tags={tags} />;

    return <PrimarySidebar tags={tags} />;
  }
}

const mapStateToProps = ({ list }: StoreState) => ({
  tags: list.tags.tags,
  loading: list.tags.loading,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  ListActions: bindActionCreators(tagsCreators, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PrimarySidebarContainer);
