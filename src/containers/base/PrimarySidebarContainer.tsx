import * as React from 'react';
import TagSidebar from 'src/components/base/TagSidebar';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { StoreState } from 'src/store/modules';
import { tagsCreators } from 'src/store/modules/list/tags';
import FakeItem from 'src/components/common/FakeItem';
import FeaturedUserSidebar from 'src/components/base/FeaturedUserSidebar';
import FeaturedPostSidebar from 'src/components/base/FeaturedPostSidebar';
import { featuredCreators } from 'src/store/modules/list/featured';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type Props = StateProps & DispatchProps;

class PrimarySidebarContainer extends React.Component<Props> {
  public initialize = () => {
    //   const { TagsActions, FeaturedActions } = this.props;
    //   TagsActions.getTags();
    //   FeaturedActions.getfeaturedPosts();
    //   FeaturedActions.getfeaturedUsers();
  };

  public componentDidMount() {
    this.initialize();
  }

  public render() {
    const {
      tags,
      tagLoading,
      postLoading,
      userLoading,
      posts,
      users,
    } = this.props;

    if (tagLoading || postLoading || userLoading) {
      return (
        <React.Fragment>
          <FakeItem item={users} />
          <FakeItem item={posts} />
          <FakeItem item={tags} />
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <FeaturedUserSidebar user={users} />
        <FeaturedPostSidebar post={posts} />
        <TagSidebar tags={tags} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ list, user }: StoreState) => ({
  posts: list.featured.posts.post,
  users: list.featured.users.user,
  tags: list.tags.tags,
  tagLoading: list.tags.loading,
  logged: !!user.user,
  postLoading: list.featured.posts.loading,
  userLoading: list.featured.users.loading,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  TagsActions: bindActionCreators(tagsCreators, dispatch),
  FeaturedActions: bindActionCreators(featuredCreators, dispatch),
});

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(PrimarySidebarContainer);
