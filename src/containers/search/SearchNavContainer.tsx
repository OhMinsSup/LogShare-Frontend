import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { StoreState } from 'src/store/modules';
import SearchNav from 'src/components/search/SearchNav';
import { searchCreators } from 'src/store/modules/search';
import SearchInput from 'src/components/search/SearchInput';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type Props = StateProps & DispatchProps;

class SearchNavContainer extends React.Component<Props> {
  public onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const { SearchActions } = this.props;

    SearchActions.changeInput({ value });
  };

  public onTab = (type: 'post' | 'user' | 'video') => {
    const { SearchActions } = this.props;

    SearchActions.changeSearchType({ type });
    SearchActions.changeInput({ value: '' });
  };

  public render() {
    const { type, value } = this.props;
    return (
      <React.Fragment>
        <SearchNav type={type} onTab={this.onTab} />
        <SearchInput value={value} onChange={this.onChange} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ search }: StoreState) => ({
  type: search.type,
  value: search.value,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  SearchActions: bindActionCreators(searchCreators, dispatch),
});

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(SearchNavContainer);
