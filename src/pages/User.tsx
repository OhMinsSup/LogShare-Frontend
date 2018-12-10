import * as React from 'react';
import { match, Route } from 'react-router';
import { Switch } from 'react-router-dom';
import HeaderContainer from 'src/containers/base/HeaderContainer';
import SidebarContainer from 'src/containers/base/SidebarContainer';
import PrimarySidebarContainer from 'src/containers/base/PrimarySidebarContainer';
import UserHeadContainer from 'src/containers/user/UserHeadContainer';
import UserPostCards from 'src/containers/list/UserPostCards';
import LikesPostCards from 'src/containers/list/LikesPostCards';
import UserFollowingCards from 'src/containers/list/UserFollowingCards';
import UserFollowerCards from 'src/containers/list/UserFollowerCards';
import UserProfileEditContainter from 'src/containers/user/UserProfileEditContainter';
import CommonTemplate from 'src/components/common/CommonTemplate';
import { History } from 'history';

const User: React.StatelessComponent<{
  match: match<{ tag: string; id: string; username: string }>;
  history: History;
}> = ({ match, history }) => (
  <CommonTemplate
    mainHead={<HeaderContainer match={match} />}
    mainSidebar={<SidebarContainer match={match} history={history} />}
    primarySidebar={<PrimarySidebarContainer />}
  >
    <UserHeadContainer match={match} />
    <Switch>
      <Route exact path="/@:username" component={UserPostCards} />
      <Route exact path="/@:username/posts" component={UserPostCards} />
      <Route exact path="/@:username/likes" component={LikesPostCards} />
      <Route exact path="/@:username/follower" component={UserFollowingCards} />
      <Route exact path="/@:username/following" component={UserFollowerCards} />
      <Route exact path="/@:username/video" component={Test} />
    </Switch>
    <UserProfileEditContainter />
  </CommonTemplate>
);

const Test = () => <div>테스트</div>;

export default User;
