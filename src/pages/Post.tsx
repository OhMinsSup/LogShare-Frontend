import * as React from 'react';
import PostTemplate from 'src/components/post/PostTemplate';
import PostViewer from 'src/containers/post/PostViewer';

const Header = () => <div>헤더</div>;

const Post = () => (
  <React.Fragment>
    <PostTemplate header={Header}>
      <PostViewer />
    </PostTemplate>
  </React.Fragment>
);

export default Post;
