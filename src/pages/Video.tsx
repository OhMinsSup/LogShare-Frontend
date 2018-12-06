import * as React from 'react';
import VideoTemplate from 'src/components/video/VideoTemplate';
import SidebarContainer from 'src/containers/base/SidebarContainer';
import HeaderContainer from 'src/containers/base/HeaderContainer';
import { match, Route } from 'react-router';
import { History } from 'history';
import VideoPageContainer from 'src/containers/video/VideoPageContainer';

const Video: React.StatelessComponent<{
  match: match<{ username?: string; id?: string; tag?: string }>;
  history: History;
}> = ({ match, history }) => (
  <VideoTemplate
    mainHead={<HeaderContainer match={match} />}
    mainSidebar={<SidebarContainer match={match} history={history} />}
  >
    <Route exact path="/development" component={VideoPageContainer} />
  </VideoTemplate>
);

export default Video;
