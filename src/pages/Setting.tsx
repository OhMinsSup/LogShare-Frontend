import * as React from 'react';
import { History } from 'history';
import { match } from 'react-router';
import CommonTemplate from 'src/components/common/CommonTemplate';
import HeaderContainer from 'src/containers/base/HeaderContainer';
import SidebarContainer from 'src/containers/base/SidebarContainer';
import PrimarySidebarContainer from 'src/containers/base/PrimarySidebarContainer';
import SettingContainer from 'src/containers/setting/SettingContainer';

const Setting: React.StatelessComponent<{
  match: match<{ tag: string; id: string; username: string }>;
  history: History;
}> = ({ match, history }) => (
  <CommonTemplate
    mainHead={<HeaderContainer match={match} />}
    mainSidebar={<SidebarContainer match={match} history={history} />}
    primarySidebar={<PrimarySidebarContainer />}
  >
    <SettingContainer />
  </CommonTemplate>
);

export default Setting;
