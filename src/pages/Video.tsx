import * as React from 'react';
import VideoTemplate from 'src/components/video/VideoTemplate';
import SidebarContainer from 'src/containers/base/SidebarContainer';
import HeaderContainer from 'src/containers/base/HeaderContainer';
import { match } from 'react-router';
import { History } from 'history';
import VideoCardListContainer from 'src/containers/video/VideoCardListContainer';

const Video: React.StatelessComponent<{
  match: match<{ username?: string; id?: string; tag?: string }>;
  history: History;
}> = ({ match, history }) => (
  <VideoTemplate
    mainHead={<HeaderContainer match={match} />}
    mainSidebar={<SidebarContainer match={match} history={history} />}
  >
    <VideoCardListContainer />
  </VideoTemplate>
);

export default Video;
