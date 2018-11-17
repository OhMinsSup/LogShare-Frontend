import * as React from 'react';
import WriteHeader from 'src/components/wrtie/WriteHeader';
import { History } from 'history';

type OwnProps = { history: History };
type Props = OwnProps;

class WriteHeaderContainer extends React.Component<Props> {
  public onGoBack = () => {
    const { history } = this.props;
    history.goBack();
  };

  public render() {
    const { onGoBack } = this;
    return <WriteHeader onGoBack={onGoBack} />;
  }
}

export default WriteHeaderContainer;
