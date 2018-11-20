import * as React from 'react';
import PostHead from 'src/components/post/PostHead';
import PostContent from 'src/components/post/PostContent';
import PostTags from 'src/components/post/PostTags';
import PostLeftSticker from 'src/components/post/PostLeftSticker';
import PostToc from 'src/components/post/PostToc/PostToc';
import { connect } from 'react-redux';
import { StoreState } from 'src/store/modules';
import { Dispatch, bindActionCreators } from 'redux';
import { throttle } from 'lodash';
import { postCreators, TocState } from 'src/store/modules/post';
import { Location } from 'history';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type OwnProps = { location: Location };
type Props = StateProps & DispatchProps & OwnProps;

class PostViewer extends React.Component<Props> {
  public onActivateHeading = throttle((headingId: string) => {
    const { PostActions } = this.props;
    PostActions.activateHeading(headingId);
  }, 250);

  public onSetToc = (toc: TocState[] | null) => {
    const { PostActions } = this.props;
    PostActions.setToc(toc);
  };

  public onToggleLike = () => {};

  public initialize = () => {};

  public componentDidUpdate(prevProps: Props) {}

  public componentWillUnmount() {}

  public componentDidMount() {
    this.initialize();
    const {
      location: { hash },
      PostActions,
    } = this.props;
    if (hash !== '') {
      PostActions.activateHeading(decodeURI(hash.split('#')[1]));
    }
  }

  public render() {
    const { toc, activeHeading, post, logged } = this.props;
    const { onActivateHeading, onSetToc, onToggleLike } = this;
    if (!post) return;

    return (
      <React.Fragment>
        <PostLeftSticker
          likes={post.info.likes}
          liked={post.liked}
          onToggleLike={onToggleLike}
          logged={logged}
          title={post.title}
        />
        <PostToc
          toc={toc}
          activeHeading={activeHeading}
          onActivateHeading={onActivateHeading}
        />
        <PostHead />
        <PostContent
          body={post.body}
          post_thumbnail={post.post_thumbnail}
          onActivateHeading={onActivateHeading}
          onSetToc={onSetToc}
        />
        <PostTags tags={post.tag} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ post, user }: StoreState) => ({
  post: post.postData,
  toc: post.toc,
  activeHeading: post.activeHeading,
  logged: !!user.user,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  PostActions: bindActionCreators(postCreators, dispatch),
});

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(PostViewer);
