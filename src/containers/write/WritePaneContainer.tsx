import * as React from 'react';
import WritePane from 'src/components/wrtie/WritePane';
import { Dispatch, bindActionCreators } from 'redux';
import { StoreState } from 'src/store/modules';
import { connect } from 'react-redux';
import { writeCreators } from 'src/store/modules/write';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type Props = StateProps & DispatchProps;

class WritePaneContainer extends React.Component<Props> {
  public onChangeInput = (name: string, value: string) => {
    const { WriteActions } = this.props;
    WriteActions.changeInput({ name, value });
  };

  public render() {
    const { title, body } = this.props;
    const { onChangeInput } = this;
    return (
      <WritePane title={title} markdown={body} onChangeInput={onChangeInput} />
    );
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
)(WritePaneContainer);
