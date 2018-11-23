import * as React from 'react';
import * as classNames from 'classnames/bind';
import PostCard from '../PostCard/PostCard';
import { PostsSubState } from 'src/store/modules/list/posts';

const styles = require('./PostCardList.scss');
const cx = classNames.bind(styles);

const PostCardList: React.StatelessComponent<{
  posts: PostsSubState[];
}> = ({ posts }) => {
  const postsList = posts.map((post, index) => {
    const { title, postId, post_thumbnail, body, info, user, createdAt } = post;

    return (
      <PostCard
        title={title}
        postId={postId}
        createdAt={createdAt}
        post_thumbnail={post_thumbnail}
        body={body}
        info={info}
        user={user}
        key={index}
      />
    );
  });
  return <div className={cx('post-card-list')}>{postsList}</div>;
};

export default PostCardList;
