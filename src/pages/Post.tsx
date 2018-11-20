import * as React from 'react';
import PostTemplate from 'src/components/post/PostTemplate';
import PostViewer from 'src/containers/post/PostViewer';
import HeaderContainer from 'src/containers/base/HeaderContainer';
import { Location } from 'history';
import { match } from 'react-router';

const Post: React.StatelessComponent<{
  location: Location;
  match: match<{ id: string }>;
}> = ({ location, match }) => (
  <React.Fragment>
    <PostTemplate header={<HeaderContainer />}>
      <PostViewer location={location} match={match} />
    </PostTemplate>
  </React.Fragment>
);

export default Post;
