import * as React from 'react';
import VideoTemplate from 'src/components/video/VideoTemplate/VideoTemplate';
import HeaderContainer from 'src/containers/base/HeaderContainer';
import { match } from 'react-router';

const Video: React.StatelessComponent<{
  match: match<{ tag: string; id: string; username: string }>;
}> = ({ match }) => (
  <VideoTemplate header={<HeaderContainer match={match} />}>dsds</VideoTemplate>
);

export default Video;
