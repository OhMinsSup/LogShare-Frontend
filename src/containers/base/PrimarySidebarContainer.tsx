import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { StoreState } from 'src/store/modules';
import FeaturedUserSidebar from 'src/components/base/FeaturedUserSidebar';
import FeaturedPostSidebar from 'src/components/base/FeaturedPostSidebar';
import { featuredCreators } from 'src/store/modules/list/featured';
import HomeInfo from 'src/components/base/HoemInfo';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type Props = StateProps & DispatchProps;

class PrimarySidebarContainer extends React.Component<Props> {
  public onRss = () => {
    const entireUrl = `https://logshare-backend.herokuapp.com/rss`;
    window.open(entireUrl);
    return;
  };

  public initialize = () => {
    //   const { FeaturedActions } = this.props;
    //   FeaturedActions.getfeaturedPosts();
    //   FeaturedActions.getfeaturedUsers();
  };

  public componentDidMount() {
    this.initialize();
  }

  public render() {
    const { posts, users } = this.props;
    return (
      <React.Fragment>
        <FeaturedUserSidebar user={users} />
        <FeaturedPostSidebar post={posts} />
        <HomeInfo onRss={this.onRss} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ list, user }: StoreState) => ({
  posts: list.featured.posts.post,
  users: list.featured.users.user,
  logged: !!user.user,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  FeaturedActions: bindActionCreators(featuredCreators, dispatch),
});

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(PrimarySidebarContainer);
