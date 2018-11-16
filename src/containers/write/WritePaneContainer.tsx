import * as React from 'react';
import WritePane from 'src/components/wrtie/WritePane';

class WritePaneContainer extends React.Component<{}> {
  public render() {
    return (
      <WritePane
        title=""
        markdown=""
        onChangeInput={(name, value) => console.log(name, value)}
      />
    );
  }
}

export default WritePaneContainer;
