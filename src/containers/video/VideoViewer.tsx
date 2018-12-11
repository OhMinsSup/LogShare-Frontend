import * as React from 'react';
import MainViewer from 'src/components/video/MainViewer';
import SubViewer from 'src/components/video/SubViewer';

class VideoViewer extends React.Component<{}> {
  public render() {
    return (
      <React.Fragment>
        <MainViewer />
        <SubViewer />
      </React.Fragment>
    );
  }
}

export default VideoViewer;
