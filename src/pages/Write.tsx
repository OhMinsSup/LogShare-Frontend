import * as React from 'react';
import WriteTemplate from 'src/components/wrtie/WriteTemplate';
import WriteHeaderContainer from 'src/containers/write/WriteHeaderContainer';
import WritePaneContainer from 'src/containers/write/WritePaneContainer';
import PreviewPanContainer from 'src/containers/write/PreviewPanContainer';
import { History, Location } from 'history';

const Write: React.StatelessComponent<{
  history: History;
  location: Location;
}> = () => (
  <WriteTemplate
    header={<WriteHeaderContainer />}
    editor={<WritePaneContainer />}
    preview={<PreviewPanContainer />}
  />
);

export default Write;
