import * as React from 'react';
import SearchBox from 'src/components/search/SearchBox';
import { connect } from 'react-redux';
import { StoreState } from 'src/store/modules';
import { Dispatch, bindActionCreators } from 'redux';
import { searchCreators } from 'src/store/modules/search';

type OwnProps = {};
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type Props = StateProps & DispatchProps;

class SearchBoxContainer extends React.Component<Props> {
  public onSearch = (keyword: string) => {
    const { SearchActions } = this.props;
    if (this.props.currentKeyword === keyword) return null;
    if (!keyword) {
      SearchActions.initialize();
      return null;
    }
    SearchActions.initialize();
    SearchActions.publicSearchRequest({
      q: keyword,
    });
    return;
  };
  public render() {
    return (
      <React.Fragment>
        <SearchBox onSearch={this.onSearch} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ search }: StoreState) => ({
  currentKeyword: search.currentKeyword,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  SearchActions: bindActionCreators(searchCreators, dispatch),
});

export default connect<StateProps, DispatchProps, OwnProps, StoreState>(
  mapStateToProps,
  mapDispatchToProps
)(SearchBoxContainer);
