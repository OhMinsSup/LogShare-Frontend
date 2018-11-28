import * as React from 'react';
import { match } from 'react-router';
import UserTemplate from 'src/components/user/UserTemplate/UserTemplate';
import HeaderContainer from 'src/containers/base/HeaderContainer';
import SidebarContainer from 'src/containers/base/SidebarContainer';
import PrimarySidebarContainer from 'src/containers/base/PrimarySidebarContainer';
import UserHeadContainer from 'src/containers/user/UserHeadContainer';

const User: React.StatelessComponent<{
  match: match<{ tag: string; id: string; username: string }>;
}> = ({ match }) => (
  <UserTemplate
    mainHead={<HeaderContainer match={match} />}
    mainSidebar={<SidebarContainer url={match.url} />}
    primarySidebar={<PrimarySidebarContainer />}
  >
    <UserHeadContainer match={match} />
    dsds
  </UserTemplate>
);

export default User;
