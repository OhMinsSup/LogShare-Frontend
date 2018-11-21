import * as React from 'react';
import { StoreState } from 'src/store/modules';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PostSequences from 'src/components/post/PostSequences';
import { postCreators } from 'src/store/modules/post';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type Props = StateProps & DispatchProps;

class PostSequencesContainer extends React.Component<Props> {
  public render() {
    const { currentUserName, currentPostId, sequences } = this.props;
    return (
      <PostSequences
        sequences={sequences}
        username={currentUserName}
        currentPostId={currentPostId}
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

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(PostSequencesContainer);
