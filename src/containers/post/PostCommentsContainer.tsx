import * as React from 'react';
import { StoreState } from 'src/store/modules';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import PostComments from 'src/components/post/PostComments';
import PostCommentInput from 'src/components/post/PostCommentInput';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type Props = StateProps & DispatchProps;

class PostCommentsContainer extends React.Component<Props> {
  public render() {
    return (
      <React.Fragment>
        <PostComments commentInput={<PostCommentInput />} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: StoreState) => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(PostCommentsContainer);
