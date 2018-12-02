import * as React from 'react';
import HeaderContainer from 'src/containers/base/HeaderContainer';
import { match } from 'react-router';
import SidebarContainer from 'src/containers/base/SidebarContainer';
import PrimarySidebarContainer from 'src/containers/base/PrimarySidebarContainer';
import NoticeViewer from 'src/containers/notice/NoticeViewer';
import CommonTemplate from 'src/components/common/CommonTemplate';

const Notice: React.StatelessComponent<{
  match: match<{ username: string }>;
}> = ({ match }) => (
  <CommonTemplate
    mainHead={<HeaderContainer match={match} />}
    mainSidebar={<SidebarContainer url={match.url} />}
    primarySidebar={<PrimarySidebarContainer />}
  >
    <NoticeViewer />
  </CommonTemplate>
);

export default Notice;
