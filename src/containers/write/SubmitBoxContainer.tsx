import * as React from 'react';
import SubmitBox from 'src/components/wrtie/SubmitBox';
import InputTags from 'src/components/wrtie/InputTags';
import { StoreState } from 'src/store/modules';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PreviewThumbnail from 'src/components/wrtie/PreviewThumbnail';
import { writeCreators } from 'src/store/modules/write';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type Props = StateProps & DispatchProps;

class SubmitBoxContainer extends React.Component<Props> {
  public onClearThumbnail = () => {
    const { WriteActions } = this.props;
    WriteActions.setThumbnail(null);
  };

  public onUploadClick = () => {
    const upload = document.createElement('input');
    upload.type = 'file';
    upload.onchange = e => {
      if (!upload.files) return;
      const file = upload.files[0];
      if (!file) return;

      const { WriteActions } = this.props;

      WriteActions.createUploadUrlPostThumbnail({ file });
    };
    upload.click();
  };

  public onInsertTag = (tag: string) => {
    const { WriteActions, tags } = this.props;
    const processedTag = tag.trim();
    if (processedTag === '') return;
    if (tags.indexOf(tag) !== -1) return;
    WriteActions.insertTag(tag);
  };

  public onRemoveTag = (tag: string) => {
    const { WriteActions } = this.props;
    WriteActions.removeTag(tag);
  };

  public onClick = () => {
    const { WriteActions } = this.props;
    WriteActions.hideWriteSubmit(false);
  };

  public render() {
    const { tags, url, open } = this.props;
    const {
      onInsertTag,
      onRemoveTag,
      onUploadClick,
      onClearThumbnail,
      onClick,
    } = this;

    return (
      <SubmitBox
        visible={open}
        inputTags={
          <InputTags
            tags={tags}
            onInsert={onInsertTag}
            onRemove={onRemoveTag}
          />
        }
        onClick={onClick}
        previewThumbnail={
          <PreviewThumbnail
            thumbnail={url}
            onClearThumbnail={onClearThumbnail}
            onUploadClick={onUploadClick}
          />
        }
      />
    );
  }
}

const mapStateToProps = ({ write }: StoreState) => ({
  open: write.submitBox.open,
  tags: write.submitBox.tags,
  url: write.upload.url,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  WriteActions: bindActionCreators(writeCreators, dispatch),
});

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(SubmitBoxContainer);
