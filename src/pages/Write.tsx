import * as React from 'react';
import WriteTemplate from 'src/components/wrtie/WriteTemplate';
import WriteHeaderContainer from 'src/containers/write/WriteHeaderContainer';
import WritePaneContainer from 'src/containers/write/WritePaneContainer';
import PreviewPanContainer from 'src/containers/write/PreviewPanContainer';
import { History, Location } from 'history';
import SubmitBoxContainer from 'src/containers/write/SubmitBoxContainer';

const Write: React.StatelessComponent<{
  history: History;
  location: Location;
}> = ({ history, location }) => (
  <WriteTemplate
    header={<WriteHeaderContainer history={history} location={location} />}
    editor={<WritePaneContainer />}
    preview={<PreviewPanContainer />}
  >
    <SubmitBoxContainer />
  </WriteTemplate>
);

export default Write;
