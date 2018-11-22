import * as React from 'react';
import { StoreState } from 'src/store/modules';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PostSequences from 'src/components/post/PostSequences';
import { postCreators } from 'src/store/modules/post';
import { History } from 'history';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type OwnProps = { history: History };
type Props = StateProps & DispatchProps & OwnProps;

class PostSequencesContainer extends React.Component<Props> {
  public onClick = (postId: string) => {
    const { history } = this.props;

    history.push(`/post/${postId}`);
  };

  public render() {
    const { currentUserName, currentPostId, sequences } = this.props;
    const { onClick } = this;

    return (
      <PostSequences
        sequences={sequences}
        username={currentUserName}
        currentPostId={currentPostId}
        onClick={onClick}
      />
    );
  }
}

const mapStateToProps = ({ post }: StoreState) => ({
  sequences: post.sequences,
  currentUserName: post.postData && post.postData.user.username,
  currentPostId: post.postData && post.postData.postId,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  PostActions: bindActionCreators(postCreators, dispatch),
});

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(PostSequencesContainer);
