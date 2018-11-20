import * as React from 'react';
import PostTemplate from 'src/components/post/PostTemplate';
import PostViewer from 'src/containers/post/PostViewer';
import { Location } from 'history';

const Header = () => <div>헤더</div>;

const Post: React.StatelessComponent<{
  location: Location;
}> = ({ location }) => (
  <React.Fragment>
    <PostTemplate header={Header}>
      <PostViewer location={location} />
    </PostTemplate>
  </React.Fragment>
);

export default Post;
