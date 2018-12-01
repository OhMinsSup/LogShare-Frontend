import * as React from 'react';
import * as queryString from 'query-string';
import WriteHeader from 'src/components/wrtie/WriteHeader';
import { History, Location } from 'history';
import { connect } from 'react-redux';
import { StoreState } from 'src/store/modules';
import { Dispatch, bindActionCreators } from 'redux';
import { writeCreators } from 'src/store/modules/write';
import { noticeCreators } from 'src/store/modules/notice';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type OwnProps = { history: History; location: Location };
type Props = OwnProps & StateProps & DispatchProps;

class WriteHeaderContainer extends React.Component<Props> {
  public onSubmit = () => {
    const {
      WriteActions,
      history,
      editor,
      tags,
      url,
      NoticeActions,
      username,
    } = this.props;
    const query = queryString.parse(this.props.location.search);

    if (query.edit_id && editor) {
      WriteActions.editSubmit({
        postId: query.edit_id as string,
        title: editor.title,
        post_thumbnail: url === '' ? null : url,
        body: editor.body,
        history,
        tags,
      });
      return;
    }

    WriteActions.writeSubmit({
      title: editor.title,
      post_thumbnail: url === '' ? null : url,
      body: editor.body,
      history,
      tags,
    });
    NoticeActions.sendMessage({
      message: `${username}님이 새로운 포스트를 작성하였습니다`,
    });
  };

  public getPost = (editId: string) => {
    const { WriteActions } = this.props;
    WriteActions.getPost({ postId: editId });
  };

  public onSubmitBox = () => {
    const { WriteActions, open } = this.props;

    if (open) {
      WriteActions.hideWriteSubmit(false);
    } else {
      WriteActions.showWriteSubmit(true);
    }
  };

  public onUploadClick = () => {
    const upload = document.createElement('input');
    upload.type = 'file';
    upload.onchange = e => {
      if (!upload.files) return;
      const file = upload.files[0];

      if (!file) return;

      const { WriteActions } = this.props;
      WriteActions.createUploadUrlPostImage({ file });
    };
    upload.click();
  };

  public onGoBack = () => {
    const { history, WriteActions } = this.props;
    history.goBack();
    WriteActions.initial();
  };

  public componentDidMount() {
    const query = queryString.parse(this.props.location.search);

    if (query.edit_id) {
      this.getPost(query.edit_id as string);
    }
  }

  public render() {
    const { onGoBack, onSubmitBox, onUploadClick, onSubmit } = this;
    const { edit_id } = queryString.parse(this.props.location.search);

    return (
      <WriteHeader
        onSubmit={onSubmit}
        onUploadClick={onUploadClick}
        onGoBack={onGoBack}
        onSubmitBox={onSubmitBox}
        isEdit={!!edit_id}
      />
    );
  }
}

const mapStateToProps = ({ write, user }: StoreState) => ({
  open: write.submitBox.open,
  editor: write.editor,
  tags: write.submitBox.tags,
  url: write.upload.url,
  postId: write.postId,
  username: user.user && user.user.username,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  WriteActions: bindActionCreators(writeCreators, dispatch),
  NoticeActions: bindActionCreators(noticeCreators, dispatch),
});

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(WriteHeaderContainer);
