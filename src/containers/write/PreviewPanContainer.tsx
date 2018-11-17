import * as React from 'react';
import PreviewPane from 'src/components/wrtie/PreviewPane';
import { StoreState } from 'src/store/modules';
import { Dispatch, bindActionCreators } from 'redux';
import { writeCreators } from 'src/store/modules/write';
import { connect } from 'react-redux';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type Props = StateProps & DispatchProps;

class PreviewPanContainer extends React.Component<Props> {
  public render() {
    const { title, body } = this.props;
    return <PreviewPane markdown={body} title={title} />;
  }
}

const mapStateToProps = ({ write }: StoreState) => ({
  title: write.editor.title,
  body: write.editor.body,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  WriteActions: bindActionCreators(writeCreators, dispatch),
});

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(PreviewPanContainer);
