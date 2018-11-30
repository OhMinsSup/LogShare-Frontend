import * as React from 'react';
import { match, Route } from 'react-router';
import { Switch } from 'react-router-dom';
import UserTemplate from 'src/components/user/UserTemplate/UserTemplate';
import HeaderContainer from 'src/containers/base/HeaderContainer';
import SidebarContainer from 'src/containers/base/SidebarContainer';
import PrimarySidebarContainer from 'src/containers/base/PrimarySidebarContainer';
import UserHeadContainer from 'src/containers/user/UserHeadContainer';
import UserPostCards from 'src/containers/list/UserPostCards';
import LikesPostCards from 'src/containers/list/LikesPostCards';
import UserFollowingCards from 'src/containers/list/UserFollowingCards';
import UserFollowerCards from 'src/containers/list/UserFollowerCards';
import UserProfileEditContainter from 'src/containers/user/UserProfileEditContainter';

const User: React.StatelessComponent<{
  match: match<{ tag: string; id: string; username: string }>;
}> = ({ match }) => (
  <UserTemplate
    mainHead={<HeaderContainer match={match} />}
    mainSidebar={<SidebarContainer url={match.url} />}
    primarySidebar={<PrimarySidebarContainer />}
  >
    <UserHeadContainer match={match} />
    <Switch>
      <Route exact path="/@:username" component={UserPostCards} />
      <Route exact path="/@:username/posts" component={UserPostCards} />
      <Route exact path="/@:username/likes" component={LikesPostCards} />
      <Route exact path="/@:username/follower" component={UserFollowingCards} />
      <Route exact path="/@:username/following" component={UserFollowerCards} />
    </Switch>
    <UserProfileEditContainter />
  </UserTemplate>
);

export default User;
