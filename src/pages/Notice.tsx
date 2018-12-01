import * as React from 'react';
import NoticeTemplate from 'src/components/notice/NoticeTemplate';
import HeaderContainer from 'src/containers/base/HeaderContainer';
import { match } from 'react-router';
import SidebarContainer from 'src/containers/base/SidebarContainer';
import PrimarySidebarContainer from 'src/containers/base/PrimarySidebarContainer';
import NoticeViewer from 'src/containers/notice/NoticeViewer';

const Notice: React.StatelessComponent<{
  match: match<{ username: string }>;
}> = ({ match }) => (
  <NoticeTemplate
    mainHead={<HeaderContainer match={match} />}
    mainSidebar={<SidebarContainer url={match.url} />}
    primarySidebar={<PrimarySidebarContainer />}
  >
    <NoticeViewer />
  </NoticeTemplate>
);

export default Notice;
