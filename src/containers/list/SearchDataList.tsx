import * as React from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { StoreState } from 'src/store/modules';
import { connect } from 'react-redux';
import { searchCreators } from 'src/store/modules/search';
import PostCardList from 'src/components/common/PostCardList';
import UserCardList from 'src/components/common/UserCardList';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type Props = StateProps & DispatchProps;

class SearchDataList extends React.Component<Props> {
  public initialize = () => {
    const { SearchActions, type, value } = this.props;

    if (type === 'post') {
      SearchActions.searchPost({ value });
    } else if (type === 'user') {
      SearchActions.searchUser({ value });
    }
  };

  public componentDidMount() {
    this.initialize();
  }

  public componentDidUpdate(preProps: Props) {
    if (
      preProps.type !== this.props.type ||
      preProps.value !== this.props.value
    ) {
      this.initialize();
    }
  }

  public render() {
    const { type, posts, users } = this.props;
    return (
      <React.Fragment>
        {type === 'post' ? (
          <PostCardList posts={posts} />
        ) : (
          <UserCardList users={users} onClick={() => console.log()} />
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ search }: StoreState) => ({
  loading: search.loading,
  value: search.value,
  posts: search.posts,
  users: search.users,
  type: search.type,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  SearchActions: bindActionCreators(searchCreators, dispatch),
});

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(SearchDataList);
