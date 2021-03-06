import * as React from 'react';
import PostTemplate from 'src/components/post/PostTemplate';
import PostViewer from 'src/containers/post/PostViewer';
import HeaderContainer from 'src/containers/base/HeaderContainer';
import { Location, History } from 'history';
import { match } from 'react-router';
import PostSequencesContainer from 'src/containers/post/PostSequencesContainer';
import PostCommentsContainer from 'src/containers/post/PostCommentsContainer';

const Post: React.StatelessComponent<{
  location: Location;
  match: match<{ tag: string; id: string; username: string }>;
  history: History;
}> = ({ location, match, history }) => (
  <React.Fragment>
    <PostTemplate header={<HeaderContainer match={match} />}>
      <PostViewer location={location} match={match} />
      <PostCommentsContainer match={match} />
    </PostTemplate>
    <PostSequencesContainer history={history} />
  </React.Fragment>
);

export default Post;
