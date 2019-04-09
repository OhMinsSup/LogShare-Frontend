import * as React from 'react';
import { connect } from 'react-redux';
import SearchResults from 'src/components/search/SearchResults';
import { StoreState } from 'src/store/modules';
import { bindActionCreators, Dispatch } from 'redux';
import { searchCreators } from 'src/store/modules/search';

type OwnProps = {};
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type Props = OwnProps & StateProps & DispatchProps;

class SearchResultsContainer extends React.Component<Props> {
  public onSearchNext = () => {
    const { currentKeyword, currentPage, pending, SearchActions } = this.props;
    if (pending) return;
    SearchActions.nextPublicSearchRequest({
      q: currentKeyword,
      page: currentPage + 1,
    });
  };
  public render() {
    return (
      <SearchResults
        results={this.props.results}
        onSearchNext={this.onSearchNext}
      />
    );
  }
}

const mapStateToProps = ({ search }: StoreState) => ({
  results: search.results,
  currentKeyword: search.currentKeyword,
  currentPage: search.currentPage,
  pending: search.npending || search.ppending,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  SearchActions: bindActionCreators(searchCreators, dispatch),
});

export default connect<StateProps, DispatchProps, OwnProps, StoreState>(
  mapStateToProps,
  mapDispatchToProps
)(SearchResultsContainer);
